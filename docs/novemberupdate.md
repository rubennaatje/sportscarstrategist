---
title: November update
date: 2020-11-29

---

# November Update

Hi there, been a while! I had trouble finding the time to work on this. Still I did, just a lot less than i wanted to. 

I have made progress though, especially the last few weeks! 

Most importantly has been some coding stuff, I have refactored a lot of the code. I have also been working on improving the performance, I had a 'memory leak' due to the cars collecting telemetry data whilst in the pits forever.. so the laps would never be finished and the object would keep growing every tick. I have also run some stress tests with around 80 clients, was a lot tougher for the backend but he could still easily handle it. I doubt 80 people will ever play this game.

Other thing is that cars now actually drive on track, taking into corners into consideration etc.

Also the frontend has new graphs, powered by e-charts this time. The third library I've worked with, however this one is exactly what I'm looking for so I will likely stay with it. Apexcharts had a lot of the things out of the box that I wanted but wasn't customizable enough and also didn't have as many features as I wanted. E charts does have those and has an insane amount of customizability. If I were to change I would likely move to d3.j.ls

Another unplanned feature is that there's now customizable dashboards. You will be able to add new dashboards, add stuff to them, and drag n drop stuff. It's sort of half in there right now. 



I'm now further working on car logic / race logic, handling battles on track, etc.

