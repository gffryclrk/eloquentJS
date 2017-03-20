# Eloquent JS SOLUTIONS

As I work through Eloquent JavaScript by Marijn Haverbeke (2nd Ed.) I'm publishing my exercise solutions up here for the world to see; warts and all. 

## FILES

I attempted to keep my file naming convention simple: chx.0y.z.js where x is the chapter and y is the sequential exercise for said chapter. When there's a z present it represents additional attempts either at a later date or after I have read the hints or solutions and decided I needed to improve upon my original solution. I've kept the original solutions for comparison purposes.

## GOALS

The goal of this exercise is quite simply to improve my knowledge and competency with JavaScript specifically and programming in general.

## CHAPTER 6: Secret Life of Objects

I was having a bit of a hard time with the meat of this chapter: the table drawing program. I after struggling I ended up going back to the start of the chapter and re-reading everything multiple times while typing out all the code. This was a good exercise. While doing so I worked on some snippets for my text editor (currently Sublime Text 3) and got a better feel of what I was trying to accomplish. I've also included comments and examples. I watched some screencasts to help with this and also read some 3rd party posts about this chapter specifically including http://tomi.io/eloquent-javascript-laying-out-a-table/ which I found to be very helpful. 

## CHAPTER 7: Project: Electronic Life

This has been an extremely valuable chapter so far. Working through a big chunk of code such as this has proven challenging and rewarding. I'm currently in the process of working through the Author's code until I understand everything. I am developing tools to help digest and understand code written by others including comments both within the code and on paper. A useful practice I'm developing is working through the code with variable examples. Setting a variable and then working out what happens as the program runs, what methods and function arguments are being passed, what they are returning, and what new variables become. This helps build the necessary mental framework to understand the program. 

A specific component of this chapter's project that I find interesting is how the grid is somewhat different to a traditional cartesian plane where (0, 0) is at the intersection of x & y. In this case the grid draws from the top down so that moving north corresponds to a negative increase to the y variable as opposed to a positive increase. For example, the north direction is (0, -1) in the destinations array as opposed to (0, 1) as I would expect from Grade 9 math. This is because the first elements in the grid array represent the top of the map and then progress downward. This is probably more analagous to how computers actually handle grid data such as how a .jpeg renders from the top down as it loads as opposed to bottom up (like a .bmp). 

***Exercises:*** I have just finished both exercises and now have a working simulation. I am pleased with how my Tigers interact with the SmartPlantEaters. The code in my ch7.electronic.life.js file seems to run fine; in the console I run:

```JavaScript
var world = new LifelikeWorld(
  ["####################################################",
   "#                 ####         ****              ###",
   "#   *  @  ##                 ########       OO    ##",
   "#   *    ##        O O                 ****       *#",
   "#       ##*                        ##########     *#",
   "#      ##***  *         ****                     **#",
   "#* **  #  *  ***      #########                  **#",
   "#* **  #      *               #   *              **#",
   "#     ##              #   O   #  ***          ######",
   "#*            @       #       #   *        O  #    #",
   "#*                    #  ######                 ** #",
   "###          ****          ***                  ** #",
   "#       O                        @         O       #",
   "#   *     ##  ##  ##  ##               ###      *  #",
   "#   **         #              *       #####  O     #",
   "##  **  O   O  #  #    ***  ***        ###      ** #",
   "###               #   *****                    ****#",
   "####################################################"],
  {"#": Wall,
   "@": Tiger,
   "O": SmartPlantEater, // from previous exercise
   "*": Plant}
);
```

Then, once I've initialized my object I simply use world.turn(); and world.toString(); to watch life take place one step at a time. However, when I try to use the author's animation code on his website I get strange errors. I'm not sure if this is from my code, his code, or a combination of the two. Since I don't seem to run into errors when running my code on its own (combined, of course, with the chatper code) I haven't spent too much time worrying about it or trying to debug. 

## CHAPTER 9: Regular Expressions

***ch9.replace.method.js***: This is a curious little bit of code that interested me. I wanted to load it in the browser and set a breakpoint and watch it function; I wasn't sure what arguments were being passed. Both amount & unit seem fairly obvious and are explained in text but I wasn't sure what was being passed to the first argument, match. It is the entire match which I suppose, in hindsight, seems intuitive. 

***Exercises:*** As usual, Regular Expression are aggravating. Without visual tools like Debuggex or Rubular they would be even more so. I didn't have too much trouble with any of the Golf exercises except the last one, number 7, which I couldn't quite solve. I eventually got so frustrated I had to look at the solution. I was very close and seeing the answer didn't make me feel a whole lot better but did help me learn. 

## CHAPTER 10: Modules

This was a difficult chapter but I enjoyed it. It seemed to be more theory than anything else, which I believe is useful. In order to understand the examples in the text I was required to do a lot of reading. I spent a lot of time doing searches and trying to understand some important programming concepts and how they apply within the context of JavaScript. I believe some important concepts are:

* Function Declarations vs Function Expression
* Variable Scope & Closures
* Immediately invoked function expressions (IIFE)
* Functions which return functions 

The last one I find very interesting. I kept seeing code that contained empty parenthesis, such as foo(); or else var foo = function(){ }();. The explanation (I think) is that the function expression, var foo, is referencing an anonymous function that returns a function. To invoke that function you must call it either when you call foo, such as foo(); or else in the case above by putting the parenthesis within the expression itself, hence the parenthesis after the code block. Strange and beautiful. 

***Useful links:***

* http://stackoverflow.com/questions/111102/how-do-javascript-closures-work
* http://www.adequatelygood.com/JavaScript-Scoping-and-Hoisting.html
* https://en.wikipedia.org/wiki/Immediately-invoked_function_expression
* http://stackoverflow.com/questions/336859/javascript-function-declaration-syntax-var-fn-function-vs-function-fn?noredirect=1&lq=1
* http://stackoverflow.com/questions/1013385/what-is-the-difference-between-a-function-expression-vs-declaration-in-javascrip