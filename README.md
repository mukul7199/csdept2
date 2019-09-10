# Department Website

Website for LNCT&S CSE Department

## Purpose

Get all info, news, events and placement records in this website. This is the API that the website is connected to.

## Note

_date format : DD/MM/YYYY_

## Format for request

### /events

*form input*  
title: { type: String, trim: true, required: true, unique: true }   
body: { type: String, trim: true, required: true }   
date: { type: String, required: true },  
image: { type: String }  

### /news
  
*JSON input*  
title,  
date  

### /showcaseItems

*form input*  
title,  
date,  
image,  
redirect  

### /calendars

*form input*  
title  
image  
thumb  
