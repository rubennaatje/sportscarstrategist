---
title: May update
date: 2020-05-29
---

# May Update

So I might start doing these monthly, but I haven't worked on this for a while. (too busy!)

I'm too busy with my graduation internship at the moment. It's going good for those who are wondering but it just costs me a lot of time. 

Sooo about the game, the past few weeks I have taken a look at maybe changing the frontend. Decided against it and just refactored for a bit.

One thing I am not decided on is changing to a pixel art graphic style. However I fear that I will go too far or that my game will look stupid / childish. So i'm staying with the sort of terminal style / minimalistic look that I currently have. I also experimented with making my current graphs pixel art and that worked decently. 

Another thing I have been working on is the orders part. The session now can be a laptime session (qualy/practice) or a position session (race). Cars start in the pitbox but need to get out etc. I also worked on design patterns to make this easy to develop with in the future.  

The frontend is refactored as well with a new graphs framework used for some nicer animations and functionalities. The trackmap I had programmed before wasn't smooth and I didn't get it to look smooth unfortunately.

That's the first thing I started working on. Mostly because it didn't require much new knowledge.

It's now build in PIXIjs instead of konva. The not smoothness could've been solved in both but PIXIjs looked nicer overall. I did need to do some stuff by hand. Konva ties in with Vue js and PIXI doesn't, it also doesn't offer any solutions for drawing svg paths. It does however have a nice library for camera stuff that I will use at the coverage screen at some point. 

Second thing was migrating to a new project. The frontend that I worked in was basically started as a  POC. So I have moved on to a new project with all the features in. A bit cleaner now.

I also worked at some tv graphics just for fun, the scrolling standings in the bottom work just like the timer at the top, with flags possible (FCY. SC. Slowzones, code 60, Green, finish)