/* tslint:disable:no-unused-expression */

interface IProgressOptions {
  minimum: number;
  template: string;
  easing: string;
  speed: number;
  trickle: boolean;
  trickleRate: number;
  trickleSpeed: number;
  showSpinner: boolean;
  parent: string;
  positionUsing: string;
  barSelector: string;
  spinnerSelector: string;
}

interface IProgress {
  version: string;
  settings: IProgressOptions;
  status: number | null;

  configure(options: Partial<IProgressOptions>): IProgress;
  set(number: number): IProgress;
  isStarted(): boolean;
  start(): IProgress;
  done(force?: boolean): IProgress;
  inc(amount?: number): IProgress;
  trickle(): IProgress;

  /* Internal */

  promise(promise?);
  render(fromStart?: boolean): HTMLDivElement;
  remove(): void;
  isRendered(): boolean;
  getPositioningCSS(): 'translate3d' | 'translate' | 'margin';
}

function createProgress(): IProgress {
  const nProgress = {} as IProgress;

  nProgress.version = '0.2.0';

  const Settings = (nProgress.settings = {
    minimum: 0.15,
    easing: 'ease',
    positionUsing: '',
    speed: 200,
    trickle: true,
    trickleRate: 0.15,
    trickleSpeed: 800,
    showSpinner: false,
    barSelector: '[role="bar"]',
    spinnerSelector: '[role="spinner"]',
    parent: 'body',
    template:
      '<div class="bar" role="bar"><div class="peg"></div></div><div class="spinner" role="spinner"><div class="spinner-icon"></div></div>',
  } as IProgressOptions);

  /**
   * (Internal) Applies css properties to an element, similar to the jQuery
   * css method.
   *
   * While this helper does assist with vendor prefixed property names, it
   * does not perform any manipulation of values prior to setting styles.
   */

  const css = (() => {
    const cssPrefixes = ['Webkit', 'O', 'Moz', 'ms'];
    const cssProps = {};

    function camelCase(string) {
      return string.replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, (match, letter) => {
        return letter.toUpperCase();
      });
    }

    function getVendorProp(name) {
      const style = document.body.style;
      if (name in style) {
        return name;
      }

      let i = cssPrefixes.length;
      const capName = name.charAt(0).toUpperCase() + name.slice(1);
      let vendorName;
      while (i--) {
        vendorName = cssPrefixes[i] + capName;
        if (vendorName in style) {
          return vendorName;
        }
      }

      return name;
    }

    function getStyleProp(name) {
      name = camelCase(name);
      return cssProps[name] || (cssProps[name] = getVendorProp(name));
    }

    function applyCss(element, prop, value) {
      prop = getStyleProp(prop);
      element.style[prop] = value;
    }

    return function test(element, properties) {
      // eslint-disable-next-line prefer-rest-params
      const args = arguments;
      let prop;
      let value;

      if (args.length === 2) {
        for (prop in properties) {
          if (properties.hasOwnProperty(prop)) {
            value = properties[prop];
            if (value !== undefined) {
              applyCss(element, prop, value);
            }
          }
        }
      } else {
        applyCss(element, args[1], args[2]);
      }
    };
  })();

  /**
   * (Internal) Queues a function to be executed.
   */

  const queue = (() => {
    const pending = [];

    function next() {
      const fn = pending.shift();
      if (fn) {
        fn(next);
      }
    }

    return (fn) => {
      pending.push(fn);
      if (pending.length === 1) {
        next();
      }
    };
  })();

  /**
   * Updates configuration.
   *
   *     NProgress.configure({
   *       minimum: 0.1
   *     });
   */
  nProgress.configure = function (options) {
    for (const key in options) {
      if (options.hasOwnProperty(key)) {
        const value = options[key];
        if (value !== undefined) {
          Settings[key] = value;
        }
      }
    }

    return this;
  };

  /**
   * Last number.
   */

  nProgress.status = null;

  /**
   * Sets the progress bar status, where `n` is a number from `0.0` to `1.0`.
   *
   *     NProgress.set(0.4);
   *     NProgress.set(1.0);
   */

  nProgress.set = function (n) {
    const started = nProgress.isStarted();

    n = clamp(n, Settings.minimum, 1);
    nProgress.status = n === 1 ? null : n;

    const progress = nProgress.render(!started);
    const bar = progress.querySelector(Settings.barSelector);
    const speed = Settings.speed;
    const ease = Settings.easing;

    progress.offsetWidth; /* Repaint */

    queue((next) => {
      // Set positionUsing if it hasn't already been set
      if (Settings.positionUsing === '') {
        Settings.positionUsing = nProgress.getPositioningCSS();
      }
      // Add transition
      css(bar, barPositionCSS(n, speed, ease));

      if (n === 1) {
        // Fade out
        css(progress, {
          transition: 'none',
          opacity: 1,
        });
        progress.offsetWidth; /* Repaint */

        setTimeout(() => {
          css(progress, {
            transition: 'all ' + speed + 'ms linear',
            opacity: 0,
          });
          setTimeout(() => {
            nProgress.remove();
            next();
          }, speed);
        }, speed);
      } else {
        setTimeout(next, speed);
      }
    });

    return this;
  };

  nProgress.isStarted = () => {
    return typeof nProgress.status === 'number';
  };

  /**
   * Shows the progress bar.
   * This is the same as setting the status to 0%, except that it doesn't go backwards.
   *
   *     NProgress.start();
   *
   */
  nProgress.start = function () {
    if (!nProgress.status) {
      nProgress.set(0);
    }

    const work = () => {
      setTimeout(() => {
        if (!nProgress.status) {
          return;
        }
        nProgress.trickle();
        work();
      }, Settings.trickleSpeed);
    };

    if (Settings.trickle) {
      work();
    }

    return this;
  };

  /**
   * Hides the progress bar.
   * This is the *sort of* the same as setting the status to 100%, with the
   * difference being `done()` makes some placebo effect of some realistic motion.
   *
   *     NProgress.done();
   *
   * If `true` is passed, it will show the progress bar even if its hidden.
   *
   *     NProgress.done(true);
   */

  nProgress.done = function (force) {
    if (!force && !nProgress.status) {
      return this;
    }

    return nProgress.inc(0.3 + 0.5 * Math.random()).set(1);
  };

  /**
   * Increments by a random amount.
   */

  nProgress.inc = (amount) => {
    let n = nProgress.status;

    if (!n) {
      return nProgress.start();
    } else {
      if (typeof amount !== 'number') {
        amount = (1 - n) * clamp(Math.random() * n, 0.1, 0.95);
      }

      n = clamp(n + amount, 0, 0.994);
      return nProgress.set(n);
    }
  };

  nProgress.trickle = () => {
    return nProgress.inc(Math.random() * Settings.trickleRate);
  };

  /**
   * Waits for all supplied jQuery promises and
   * increases the progress as the promises resolve.
   *
   * @param $promise jQUery Promise
   */
  let initial = 0;
  let current = 0;

  nProgress.promise = function ($promise) {
    if (!$promise || $promise.state() === 'resolved') {
      return this;
    }

    if (current === 0) {
      nProgress.start();
    }

    initial++;
    current++;

    $promise.always(() => {
      current--;
      if (current === 0) {
        initial = 0;
        nProgress.done();
      } else {
        nProgress.set((initial - current) / initial);
      }
    });

    return this;
  };

  /**
   * (Internal) renders the progress bar markup based on the `template`
   * setting.
   */

  nProgress.render = (fromStart): HTMLDivElement => {
    if (nProgress.isRendered()) {
      return document.getElementById('nprogress') as HTMLDivElement;
    }
    addClass(document.documentElement, 'nprogress-busy');
    const progress = document.createElement('div');

    progress.id = 'nprogress';
    progress.innerHTML = Settings.template;
    const bar = progress.querySelector(Settings.barSelector);

    const perc = fromStart ? '-100' : toBarPerc(nProgress.status || 0);
    const parent = document.querySelector(Settings.parent);
    let spinner;

    css(bar, {
      transition: 'all 0 linear',
      transform: 'translate3d(' + perc + '%,0,0)',
    });

    if (!Settings.showSpinner) {
      spinner = progress.querySelector(Settings.spinnerSelector);
      if (spinner) {
        removeElement(spinner);
      }
    }

    if (parent !== document.body) {
      addClass(parent, 'nprogress-custom-parent');
    }

    parent.appendChild(progress);
    return progress as HTMLDivElement;
  };

  /**
   * Removes the element. Opposite of render().
   */

  nProgress.remove = () => {
    removeClass(document.documentElement, 'nprogress-busy');
    removeClass(document.querySelector(Settings.parent), 'nprogress-custom-parent');
    const progress = document.getElementById('nprogress');
    if (progress) {
      removeElement(progress);
    }
  };

  /**
   * Checks if the progress bar is rendered.
   */

  nProgress.isRendered = () => {
    return !!document.getElementById('nprogress');
  };

  /**
   * Determine which positioning CSS rule to use.
   */

  nProgress.getPositioningCSS = () => {
    // Sniff on document.body.style
    const bodyStyle = document.body.style;

    // Sniff prefixes
    const vendorPrefix =
      'WebkitTransform' in bodyStyle
        ? 'Webkit'
        : 'MozTransform' in bodyStyle
        ? 'Moz'
        : 'msTransform' in bodyStyle
        ? 'ms'
        : 'OTransform' in bodyStyle
        ? 'O'
        : '';

    if (vendorPrefix + 'Perspective' in bodyStyle) {
      // Modern browsers with 3D support, e.g. Webkit, IE10
      return 'translate3d';
    } else if (vendorPrefix + 'Transform' in bodyStyle) {
      // Browsers without 3D support, e.g. IE9
      return 'translate';
    } else {
      // Browsers without translate() support, e.g. IE7-8
      return 'margin';
    }
  };

  /**
   * Helpers
   */

  function clamp(n, min, max) {
    if (n < min) {
      return min;
    }
    if (n > max) {
      return max;
    }
    return n;
  }

  /**
   * (Internal) converts a percentage (`0..1`) to a bar translateX
   * percentage (`-100%..0%`).
   */

  function toBarPerc(n) {
    return (-1 + n) * 100;
  }

  /**
   * (Internal) returns the correct CSS for changing the bar's
   * position given an n percentage, and speed and ease from Settings
   */

  function barPositionCSS(n, speed, ease) {
    let barCSS;

    if (Settings.positionUsing === 'translate3d') {
      barCSS = { transform: 'translate3d(' + toBarPerc(n) + '%,0,0)' };
    } else if (Settings.positionUsing === 'translate') {
      barCSS = { transform: 'translate(' + toBarPerc(n) + '%,0)' };
    } else {
      barCSS = { 'margin-left': toBarPerc(n) + '%' };
    }

    barCSS.transition = 'all ' + speed + 'ms ' + ease;

    return barCSS;
  }

  /**
   * (Internal) Determines if an element or space separated list of class names contains a class name.
   */

  function hasClass(element, name) {
    const list = typeof element === 'string' ? element : classList(element);
    return list.indexOf(' ' + name + ' ') >= 0;
  }

  /**
   * (Internal) Adds a class to an element.
   */

  function addClass(element, name) {
    const oldList = classList(element);
    const newList = oldList + name;

    if (hasClass(oldList, name)) {
      return;
    }

    // Trim the opening space.
    element.className = newList.substring(1);
  }

  /**
   * (Internal) Removes a class from an element.
   */

  function removeClass(element, name) {
    const oldList = classList(element);

    if (!hasClass(element, name)) {
      return;
    }

    // Replace the class name.
    const newList = oldList.replace(' ' + name + ' ', ' ');

    // Trim the opening and closing spaces.
    element.className = newList.substring(1, newList.length - 1);
  }

  /**
   * (Internal) Gets a space separated list of the class names on the element.
   * The list is wrapped with a single space on each end to facilitate finding
   * matches within the list.
   */

  function classList(element) {
    return (' ' + (element.className || '') + ' ').replace(/\s+/gi, ' ');
  }

  /**
   * (Internal) Removes an element from the DOM.
   */

  function removeElement(element) {
    if (element && element.parentNode) {
      element.parentNode.removeChild(element);
    }
  }

  return nProgress;
}
const NProgress = createProgress();
export default NProgress;
