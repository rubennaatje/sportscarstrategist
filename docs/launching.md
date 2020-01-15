---
title: How will it work / launch
date: 2019-11-29
---
The game consists of three executables, 1: the launcher, 2: the game frontend, 3: the race simulation

I'm going to talk about them for a quick blog in reverse order.

## Race Simulation
This is the executable that runs the race. There's not much else to be said. As it won't be visually showing you anything, every interaction with this goes through the launcher or frontend. 

The frontend will have a connection with this over websockets, socket.io to be more precise. 

One thing that is important is that this process loads up everything from a race file, a json formatted document that has all the information on a race. 

## Game Frontend
This is the place where you actually play the game, this will only handle the actual on track stuff. Look at the features blogpost for more information on that.

This will be written Electron with Nuxt in JS. Perhaps I will convert later on to typescript but there's a bug at the moment which prevents me from that. 


There will also be an **admin screen** on the game frontend, if you've entered the admin pw in the launcher you will get an extra screen with will have a few options to make live changes as a sort of race director.
- Remove/Give a penalty for a certain entry.
- FCY/SC stop or start.
- Skip to next session
- Set session speed (x1, x2, x3)
- DQ an entry
- Ban a user.
- Red flag the race, for pausing the race. 


## Launcher
The launcher will be the executable that you will open, this is written in electron js/nuxt as well. This will be the most important part for today.

This launcher is where you join a session, choose an entry/car or startup a race. 

How this works is you fill in the adress (or click one of the previously joined ones) and a list of cars pops up with also a bit of session info of course. When you've selected everything and press join, the launcher will start the Game frontend process with a couple of arguments. Like username, entry and also most importantly the address of the host.

Hosting a race will work a bit the same, you select a race and a couple of options and the executable will be started with the fitting arguments. 

It will stay on in the background and does checks for crashes (for both the RS and GF). Of course I will try to make sure this doesn't happen but you never know. The GF will just relaunch like nothing happened, everything you do is saved on the RS so there shouldn't be any issue. The RS however, because we dont' want to lose progress saves the state of the race for every leader lap into a file. when it crashes, the launcher will tell the RS to startup with that file and continue the race. The lost time will be lost unfortunately unless you have a distance set instead of a time. 