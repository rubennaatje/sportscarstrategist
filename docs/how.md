---
title: How is it going to be build
date: 2019-11-26
---
# Modability 
This game is 100% moddable in terms of tracks, teams, drivers, etc
Everything can easily be added, either by adding new files or by using a tool used to generate these files from .csv files (low priority goal atm)


# Multiplayer + back-end
So the game is going to be multiplayer, which is why I decided for node js (or more node ts as it's written in typescript). But it's not going to a central server. One of the players hosts the game and will share his address so that the rest can join. He is also the only one who needs the race files(or modded files). The game uses upnp to try and host the game, otherwise the host will have to port forward. Most modern routers support upnp so that's why i chose the easy route.

# Frontend
The frontend is written in Javascript as well, in electron even. I know there's lots of hate but it's a genius solution, especially for this game. I use it with nuxt so it's very lightweight, so far it uses only like 100mb so no worries about it using all your ram. 

# Old front-end 
the game was originally going to run in the terminal! I even had a POC of some graphs showing and a track on screen. At some point I realized it was difficult to do a full application with it and also difficult to distribute as you need specific settings for your terminal client in order to use it. (I used some braille characters to draw lines for my trackmap and graphs). So I looked into packaging it with a terminal client but no luck. Then I looked at running it in a Electron js app with a browser terminal emulator. Worked pretty cool but honestly the performance of the whole terminal thing wasn't too good so I decided to look into using electron with nuxt.

And I enjoyed it so much, I had more than I ever had with the terminal app in no time. It's very modular and just nice overall. 




