import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AllTicketsComponent } from './all-tickets/all-tickets.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CreateNewTicketComponent } from './create-new-ticket/create-new-ticket.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditTicketComponent } from './edit-ticket/edit-ticket.component';
import { TicketOverviewComponent } from './ticket-overview/ticket-overview.component';
import { HistoryComponent } from './history/history.component';
import { CommentComponent } from './comment/comment.component';
import { HttpClientModule} from '@angular/common/http';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AllTicketsComponent,
    CreateNewTicketComponent,
    EditTicketComponent,
    TicketOverviewComponent,
    HistoryComponent,
    CommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
