import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { NavComponent } from './nav.component';
import { DocViewerComponent } from 'app/docviewer/docviewer.component';
import { EmbeddedModule } from 'app/embedded/embedded.module';
import { DocumentService } from 'app/shared/document.service';
import { LocationService } from 'app/shared/location.service';
import { ScrollService } from 'app/shared/scroll.service';

import { QuestionnaireModule } from 'app/questionnaire/questionnaire.module';

import { MarkdownModule, MarkedOptions, MarkedRenderer } from 'ngx-markdown';

export function markedOptions(): MarkedOptions {
	const renderer = new MarkedRenderer();

	renderer.blockquote = (text: string) => {
		return '<blockquote class="blockquote"><p>' + text + '</p></blockquote>';
	};

	return {
		renderer: renderer,
		gfm: true,
		tables: true,
		breaks: false,
		pedantic: false,
		sanitize: false,
		smartLists: true,
		smartypants: false,
	};
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    DocViewerComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EmbeddedModule,
    HttpClientModule,
    QuestionnaireModule,
		MarkdownModule.forRoot({
			loader: HttpClient,
			markedOptions: {
				provide: MarkedOptions,
				useFactory: markedOptions,
			},
		})
  ],
  providers: [
    DocumentService,
    Location,
    { provide: LocationStrategy, useClass: PathLocationStrategy },
    LocationService,
    ScrollService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
