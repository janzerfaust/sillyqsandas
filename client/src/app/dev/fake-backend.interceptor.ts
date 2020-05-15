import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay, mergeMap, materialize, dematerialize } from 'rxjs/operators';
import { CardPair } from '../model/cardpair';

let questions = JSON.parse(localStorage.getItem('questions')) || [];
let answers = JSON.parse(localStorage.getItem('answers')) || [];

/**
 * Thanks for https://jasonwatmore.com/post/2020/03/10/angular-8-fake-backend-example-for-backendless-development!
 */
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const { url, method, headers, body } = req;

        return of(null)
            .pipe(mergeMap(handleRoute))
            .pipe(materialize())
            .pipe(delay(500))
            .pipe(dematerialize());

        function handleRoute() {
            switch(true) {
                case url.endsWith('cards/create') && method === "POST":
                    return createCardPair();     
                case url.endsWith('cards/randompair') && method === "GET":
                    return randomPair();               
                default:
                    return next.handle(req);
            }
        }

        function createCardPair() {
            const { question, answer, collection } = body;
            questions.push(question);
            answers.push(answer);
            localStorage.setItem('questions', JSON.stringify(questions));
            localStorage.setItem('answers', JSON.stringify(answers));
            return ok();
        }

        function randomPair() {
            const qRandom = Math.floor(Math.random() * questions.length);
            const aRandom = Math.floor(Math.random() * answers.length);
            const q = questions[qRandom];
            const a = answers[aRandom];
            return ok(<CardPair>{ question: q, answer: a});
        }

        function ok(body?) {
            return of(new HttpResponse({ status: 200, body }));
        }
        
    }
}

export const fakeBackendInterceptor = {
    provide: HTTP_INTERCEPTORS,
    useClass: FakeBackendInterceptor,
    multi: true
};