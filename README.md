# RCT2 Fleecer

RCT2 Fleecer is a small web app to help manage the entry fee or ride ticket prices for the games RollerCoaster Tycoon 2, RollerCoaster Tycoon Classic and OpenRCT2. Given a ride's type and ratings, it will calculate the maximum price that guests will pay for that ride. Build up a list of rides and see at a glance how much the rides in your park are worth!

[https://invalio19.github.io/rct2-fleecer/](https://invalio19.github.io/rct2-fleecer/)

## Features

- Build up a list of rides and see the maximum price you can charge for them (or the 'good value' price) in pay-per-ride scenarios.
- See the recommended park entrance fee to attract as many guests and make as much money as possible in pay-for-entry scenarios.
- Automatic duplicate ride type detection (having more than one ride of the same type decreases its value by about 25%).
- Data is auto-saved to the browser whenever any details are changed, and persists even when the page is closed.
- View a ride's minimum stat requirements, so you can build rides without rating penalties.
- Compatible with RCT2, RCT Classic and OpenRCT2.
- Manually sort the order of rides.
- Designed to work well on mobile.

## Planned features

See the [issue tracker](https://github.com/invalio19/rct2-fleecer/issues).

## Built with

- [Angular](https://angular.io/) v9.1.0.
- [Bulma](https://bulma.io/) v0.8.0.
- [Bulma Checkradio](https://wikiki.github.io/form/checkradio/) v1.1.1
- [Font Awesome](https://fontawesome.com/) v5.13.0

## Contributing

Feel free to fork this project and create your own pull requests.

Bugs and feature requests can be raised [here](https://github.com/invalio19/rct2-fleecer/issues). There are a number of planned/potential features here already so do check check that your request isn't already on the list!

## FAQs

**1. Why am I seeing the wrong ride price? Guests still refuse to go on my ride.**

There could be a few reasons for this.

- If you are charging a park entrance fee, make sure you've checked that checkbox since this will quarter the price you can charge.
- If you have more than one of the same type of ride in the park, this should be flagged automatically, and will reduce the price you can charge by about 25%.
- Have the ratings on your ride increased or decreased? Many things can change the ratings of a ride, including scenery and other nearby rides.
- Check that you have the right game version chosen of either 'RCT2 / RCT Classic' or 'OpenRCT2', as they have different calculation algorithms for the earlier months of a ride's life.
- If you genuinely think there is an error in the calculation, raise it as a bug [here](https://github.com/invalio19/rct2-fleecer/issues), providing as much information as you can give.

**2. Why are two of my rides considered duplicates of each other even though they are different ride types?**

Some ride types in RCT2 are considered the same for some game mechanics, including the mechanics used for determining ride price value. These rides are:

- The **Car Ride** and **Monster Trucks**.
- The **Classic Mini Roller Coaster** (OpenRCT2 only) and **Junior Roller Coaster**.
- The **Corkscrew Roller Coaster** and **Hypercoaster**.
- The **Hyper-Twister** and **Steel Twister**.
- The **Spinning Wild Mouse** and **Steel Wild Mouse**.

**3. I can't find X ride in the ride type list. Where is it?**

Some rides are just renamed and reskinned versions of another type of ride, but have no difference in stats and would still be considered a duplicate of the original ride type. For example, the **Fire Cracker Ride** is simply a reskinned **Enterprise**. In future updates I plan to include all alternative names for ride types to mitigate this problem.

**4. My ride is six years old but the price calculation for 'less than 88 months old' is wrong. Why is that?**

A year in RollerCoaster Tycoon is only eight months long, from March to October, presumably to simulate when real-life parks are closed for the winter. You should select the number of months accordingly.

**5. I reduced the age of my coaster, yet its value went up. Why?**

After 200 months—25 years in RollerCoaster Tycoon time—the value of a ride actually goes up instead of down and will stay at that level forevermore. I would imagine this is to simulate the appeal of retro roller coasters in real life.

**6. How does this app save my data? Can I transfer it to another browser or device?**

RCT2 Fleecer uses LocalStorage to save data about the current page to your browser. Currently there is no in-app support for transferring this data to another browser or device.

**7. This app doesn't work on my browser. Why not?**

RCT2 Fleecer was largely built and tested using Google Chrome. Modern browsers like Firefox should also have no issues handling it, but older browsers such as Internet Explorer cannot.

## Changelog

See the [CHANGELOG](https://github.com/invalio19/rct2-fleecer/blob/master/CHANGELOG.md) file.

## Authors

- Shay Irwin: [Invalio](https://github.com/invalio19)

## License

- [MIT](http://opensource.org/licenses/mit-license.php). See the [LICENSE](https://github.com/invalio19/rct2-fleecer/blob/master/LICENSE) file for details.
- Copyright 2020 &copy; Invalio.

## Acknowledgements

- [Deurklink](https://www.youtube.com/channel/UCcU9si2fIVJ-KoIDX9xYpdw), for his [work](https://forums.openrct2.org/topic/2737-guide-how-much-can-you-charge-for-your-rides/) in uncovering how the ride pricing is determined.
- [Marcel Vos](https://www.youtube.com/channel/UCBlXovStrlQkVA2xJEROUNg), for [explaining](https://www.youtube.com/watch?v=rUGUwZIr4n0) how this and many other RCT2 mechanics work, as well as some very entertaining RCT2 videos.
- [shottysteve](https://www.youtube.com/shottysteve), for designing the [calculator](https://rct2calc.shottysteve.com/) that helped inspire this one.
- [Ted 'IntelOrca' John](http://intelorca.co.uk/) and the various contributors to the [OpenRCT2](https://openrct2.org/) project.