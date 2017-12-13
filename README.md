# Anchor Scroller

Javascript library to handle navigating with anchor links when there is a need to offset the browser's native jumping scroll effect. Having a fixed header element and navigating to an anchor point that is on a different page can cause the content to be covered by the header. Using this library, the browser will smooth scroll to a position taking an offset into account.

The library achieves this by quickly adding the anchor point's id to the html tag so the browser jumps to the top of the page. Then it sets the anchor point to it's intended spot and scrolls to that spot. For now there is a caveat, you can't use the id attribute on the html tag, as you can only use one id on any html element.

Demo [here](http://sandbox.envivent.com/anchor-scroll/)

## Instructions

Reference this script in the head so it runs before the DOM is loaded.

Call `AnchorScroller` like so:

    var a = new AnchorScroller();

    a.init();

`AnchorScroller` can take three arguments: two different offsets and a breakpoint at which to switch between them.
For example:

If we are using this library to offset a fixed header that is 75px in mobile view and 150px in desktop view with a breakpoint at 737px, pass the arguments:

    var a = new AnchorScroller(150, 75, 737);

    a.init();

This will cause the offset to change between mobile and desktop view.

If you want to offset the scroll and only need one offset:

    var a = new AnchorScroller(150);

    a.init();

## TODO

* Make it possible for users to use an id on the html tag