## Eloquent JS Solutions

As I work through Eloquent JavaScript by Marijn Haverbeke (2nd Ed.) I'm publishing my exercise solutions up here for the world to see; warts and all. 

## FILES

I attempted to keep my file naming convention simple: chx.0y.z.js where x is the chapter and y is the sequential exercise for said chapter. When there's a z present it represents additional attempts either at a later date or after I have read the hints or solutions and decided I needed to improve upon my original solution. I've kept the original solutions for comparison purposes.

## GOALS

The goal of this exercise is quite simply to improve my knowledge and competency with JavaScript specifically and programming in general.

## CHAPTER 6: Secret Life of Objects

I was having a bit of a hard time with the meat of this chapter: the table drawing program. I after struggling I ended up going back to the start of the chapter and re-reading everything multiple times while typing out all the code. This was a good exercise. While doing so I worked on some snippets for my text editor (currently Sublime Text 3) and got a better feel of what I was trying to accomplish. I've also included comments and examples. I watched some screencasts to help with this and also read some 3rd party posts about this chapter specifically including http://tomi.io/eloquent-javascript-laying-out-a-table/ which I found to be very helpful. 

## CHAPTER 7: Project: Electronic Life

This has been an extremely valuable chapter so far. Working through a big chunk of code such as this has proven challenging and yet equally rewarding. I'm currently in the process of commenting the Author's code essentially line by line. One thing that I find interesting is that the grid is somewhat different to a traditional cartesian plane where (0, 0) is at the intersection of x & y. In this case the grid draws from the top down so that moving north corresponds to a negative increase to the y variable as opposed to a positive increase. For example, the north direction is (0, -1) in the destinations array as opposed to (0, 1) as I would expect from Grade 9 math. This is because the first elements in the grid array represent the top of the map and then progress downward. This is probably more analagous to how computers actually handle grid data such as how a .jpeg renders from the top down as it loads as opposed to bottom up (like a .bmp). 