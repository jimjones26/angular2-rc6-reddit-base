import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

// article model
class Article {
    title: string;
    link: string;
    votes: number;

    constructor(title: string, link: string, votes?: number) {
        this.title = title;
        this.link = link;
        this.votes = votes || 0;
    }

    voteUp() {
        this.votes += 1;
    }

    voteDown() {
        this.votes -= 1;
    }

    domain(): string {
        try {
            const link: string = this.link.split('//')[1];
            return link.split('/')[0];
        } catch (err) {
            return null;
        }
    }
}

// article component
@Component({
    selector: 'reddit-article',
    host: {
        class: 'row'
    },
    template: `
        <div class="four wide column center aligned votes">
            <div class="ui statistic">
                <div class="value">
                    {{ article.votes }}
                </div>
                <div class="label">
                    Points
                </div>
            </div>
        </div>
        <div class="twelve wide column">
            <a class="ui large header" href="{{ article.link }}">
                {{ article.title }}
            </a>
            <ul class="ui big horizontal list voters">
                <li class="item">
                    <a href (click)="voteUp()">
                        <i class="arrow up icon"></i> upvote
                    </a>
                </li>
                <li class="item">
                    <a href (click)="voteDown()">
                        <i class="arrow down icon"></i> downvote
                    </a>
                </li>
            </ul>
        </div>
    `
})
class ArticleComponent {
    article: Article;

    constructor() {
        this.article = new Article('Angular 2', 'http://angular.io', 10);
    }

    voteUp() {
        this.article.voteUp();
        return false;
    }

    voteDown() {
        this.article.voteDown();
        return false;
    }
}

// root component
@Component({
    selector: 'reddit',
    template: `
        <form class="ui large form segment">
            <h3 class="ui header">Add a Link</h3>

            <div class="field">
                <label for="title">Title:</label>
                <input name="title" #newtitle>
            </div>
            <div class="field">
                <label for="link">Link:</label>
                <input name="link" #newlink>
            </div>
            <button (click)="addArticle(newtitle, newlink)"  
            class="ui positive right floated button">  
                Submit link  
            </button>
        </form>
        <div class="ui grid posts">
            <reddit-article></reddit-article>
        </div>
    `
})
class RedditApp {
    // TODO: finish out addArticle function
    addArticle(title: HTMLInputElement, link: HTMLInputElement): boolean {
        console.log(`
            Adding article title: ${ title.value} and link: ${link.value}
        `);
        return false;
    }
}

@NgModule({
    declarations: [
        RedditApp, ArticleComponent
    ],
    imports: [BrowserModule],
    bootstrap: [RedditApp],
})
class RedditAppModule {

}

platformBrowserDynamic().bootstrapModule(RedditAppModule);