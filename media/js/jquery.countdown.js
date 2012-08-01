/*
 * jquery-countdown plugin
 *
 * Copyright (c) 2009 Martin Conte Mac Donell <Reflejo@gmail.com>
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 */

jQuery.fn.countdown = function(userOptions)
{
  // Default options
  var options = {
    stepTime: 60,
    // startTime and format MUST follow the same format.
    // also you cannot specify a format unordered (e.g. hh:ss:mm is wrong)
    format: "dd:hh:mm:ss",
    startTime: "01:12:32:55",
    digitImages: 6,
    digitWidth: 67,
    digitHeight: 90,
    timerEnd: function(){},
    image: "digits.png"
  };
  var digits = [], interval;
  var forceStop = false;

  // Draw digits in given container
  var createDigits = function(where)
  {
    var c = 0;
    // Iterate each startTime digit, if it is not a digit
    // we'll asume that it's a separator
    for (var i = 0; i < options.startTime.length; i++)
    {
      if (parseInt(options.startTime[i]) >= 0)
      {
        elem = $('<div id="cnt_' + c + '" class="cntDigit" />').css({
          height: options.digitHeight,
          float: 'left',
          background: 'url(\'' + options.image + '\')',
          width: options.digitWidth
        });

        digits.push(elem);
        margin(c, -((parseInt(options.startTime[i]) * options.digitHeight *
                              options.digitImages)));
        // Add max digits, for example, first digit of minutes (mm) has
        // a max of 5. Conditional max is used when the left digit has reach
        // the max. For example second "hours" digit has a conditional max of 4
        switch (options.format[i]) 
        {
          case 'h':
            digits[c]._max = function(pos, isStart) {
              if (pos % 2 == 0)
                return 2;
              else
                return (isStart) ? 3: 9;
            };
            break;
          case 'd':
            digits[c]._max = function(){ return 9; };
            break;
          case 'm':
          case 's':
            digits[c]._max = function(pos){ return (pos % 2 == 0) ? 5: 9; };
        }
        ++c;
      }
      else
      {
        elem = $('<div class="cntSeparator"/>').css({float: 'left'})
                                               .text(options.startTime[i]);
      }

      where.append(elem)
    }
  };

  // Set or get element margin
  var margin = function(elem, val)
  {
    if (val !== undefined)
    {
      digits[elem].margin = val;
      return digits[elem].css({'backgroundPosition': '0 ' + val + 'px'});
    }

    return digits[elem].margin || 0;
  };

  var makeMovement = function(elem, steps, isForward)
  {
    var x = 0;
    var intervalID = setInterval(function () {
      if (forceStop || (x++ === options.digitImages * steps))
        return window.clearInterval(intervalID);

      var diff = isForward ? -options.digitHeight: options.digitHeight;
      margin(elem, margin(elem) + diff);
    }, options.stepTime / steps);
  };

  // Makes the movement. This is done by "digitImages" steps.
  var moveDigit = function(elem)
  {
    // If there is no argument, we'll move the last digit (the most active one)
    elem = (elem === undefined) ? digits.length - 1: elem;

    if (margin(elem) == 0)
    {
      // Is there still time left?
      if (elem > 0)
      {
        var isStart = margin(elem - 1) == 0;
        makeMovement(elem, digits[elem]._max(elem, isStart), true);
        moveDigit(elem - 1);
      }
      else // That condition means that we reach the end! 00:00.
      {
        forceStop = true;
        clearInterval(interval);
        for (var i = 0; i < digits.length; i++)
        {
          margin(i, 0);
        }
        options.timerEnd();
      }

      return;
    }

    makeMovement(elem, 1);
  };

  $.extend(options, userOptions);
  createDigits(this);
  interval = setInterval(moveDigit, 1000);
};
