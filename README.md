# Department Website

Website for LNCT&S CSE Department

## Note

_date format : DD/MM/YYYY_

## Format for request

### /events


title: { type: String, trim: true, required: true, unique: true }   
body: { type: String, trim: true, required: true }   
date: { type: String, required: true },
image: { type: String }  

### /news
  
title,  
date  

### /showcaseItems

title,  
date,  
image,  
redirect  
