# Department Website

Website for LNCT&S CSE Department

## Note

_date format : MM/DD/YYYY_

## Format for request

### /events

_Field **date** is to be added_  
title: { type: String, trim: true, required: true, unique: true }   
body: { type: String, trim: true, required: true }   
image: { type: String }  

### /news

_At the moment, news will not be deleted automatically after the date expires_  
title,  
body(will default to title if not specified),  
date  

### /showcaseItems

title,  
date,  
image,  
redirect  
