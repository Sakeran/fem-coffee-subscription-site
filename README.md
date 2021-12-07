# fem-coffee-subscription-site

This is a solution to the [Coffeeroasters subscription site challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/coffeeroasters-subscription-site-5Fc26HVY6). Frontend Mentor challenges help you improve your coding skills by building realistic projects. 

## Notes
(December 7th, 2021)

This was the roughest FEM challenge I've tackled so far, taking me nearly four days longer to complete than I'd anticipated.

For the most part, implementing the design itself was no issue - my workflow with TailwindCSS is getting faster these days, so almost everything came together in the space of a day or so. I did run into one issue implementing the "coffee collection" section on the home page, since the mockup's oversized text and overlapping content made dealing with line-wrapping something of a headache. Nothing was particularly complex beyond that, though.

The interactive form on the subscription page consumed the vast majority of my time, requiring several rewrites and refactors. Some of this can be put down to my being out of practice - it had been a while since I'd needed to implement anything beyond a simple sign-up/sign-in form, and some bad state-management decisions had to be addressed as I ran into problems with it.

The *real* challenge had nothing to do with implementation, and more in discerning how the UI was supposed to work in the first place. The provided mockup was quite detailed in terms of layout, but somewhat underdetermined when it came to user interactions. There were a few odd details in the form's design that feel like they might have been mistakes, but there's no way to be sure. Unlike a real-world project, I can't directly ask the designer about it. If nothing else, I've certainly come to appreciate the value of interactive mockups.

Ultimately, I think I delivered a reasonable implementation, though I'm not convinced it's a 100% match for the designer-intended experience. In retrospect, I should probably have thought through the entire interaction before jumping into its code - at least then I would have noticed the missing specifications earlier, and probably shaved a day or two off of the development time.