Take a look to the [demostration](http://reflejo.github.com/jquery-countdown/). This countdown has an amazing animation.

This project is still at beta stage, and probably it will remain that way :(. Now you can download the PSD file (It's [here](https://github.com/Reflejo/jquery-countdown/blob/master/img/digits.psd))

### Basic usage:

```javascript
  $('#counter').countdown({startTime: "01:12:32:55"});
```

### Complete usage:

```javascript
  $('#counter').countdown({
    stepTime: 60,
    format: 'hh:mm:ss',
    startTime: "12:32:55",
    digitImages: 6,
    digitWidth: 53,
    digitHeight: 77,
    timerEnd: function() { alert('end!!'); },
    image: "digits.png"
  });
```

### Added continuously countdown

```javascript
  $('#counter').countdown({
    format: 'sss',
    startTime: "120",
    continuous: true,
    timerEnd: function() { alert('end!!'); },
    image: "digits.png"
  });
```

###Countdown to a Date

Relative to current hour:

```javascript
  $('#counter').countdown({
    image: "digits.png",
    format: "mm:ss",
    endTime: '50:00'
  });
```

An absolute date:


```javascript
  $('#counter').countdown({
    image: "digits.png",
    format: "mm:ss",
    endTime: new Date('07/16/13 05:00:00')
  });
```

Did I mention that js code weighs just **1.7 KB**?

### Author

Martín Conte Mac Donell <Reflejo@gmail.com> - [@fz](https://twitter.com/fz)

### Demo

See the [demo](http://reflejo.github.com/jquery-countdown/) !!.
