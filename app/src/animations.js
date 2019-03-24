import { keyframes, style } from 'typestyle'

export default {
  fadeInRight: style({
    animationDuration: '.55s',
    animationFillMode: 'both',
    animationName: keyframes({
      '0%': {
        opacity: 0,
        transform: 'translateX(20px)'
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(0)'
      }
    })
  }),
  fadeInLeft: style({
    animationDuration: '.55s',
    animationFillMode: 'both',
    animationName: keyframes({
      '0%': {
        opacity: 0,
        transform: 'translateX(-20px)'
      },
      '100%': {
        opacity: 1,
        transform: 'translateX(0)'
      }
    })
  }),
  fadeInUp: style({
    animationDuration: '.55s',
    animationFillMode: 'both',
    animationName: keyframes({
      '0%': {
        opacity: 0,
        transform: 'translateY(20px)'
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)'
      }
    })
  }),
  fadeInDown: style({
    animationDuration: '.55s',
    animationFillMode: 'both',
    animationName: keyframes({
      '0%': {
        opacity: 0,
        transform: 'translateY(-20px)'
      },
      '100%': {
        opacity: 1,
        transform: 'translateY(0)'
      }
    })
  }),
  fadeIn: style({
    animationDuration: '.55s',
    animationFillMode: 'both',
    animationName: keyframes({
      '0%': {
        opacity: 0,
      },
      '100%': {
        opacity: 1,
      }
    })
  }),
  rotate: style({
    animationDuration: '4s',
    animationIterationCount: 'infinite',
    animationName: keyframes({
      '100%': {
        transform: 'rotate(360deg)'
      }
    })
  }),
  delay: {
    '0.025': style({
      animationDelay: '0.025s'
    }),
    '0.50': style({
      animationDelay: '0.50s'
    }),
    '0.75': style({
      animationDelay: '0.75s'
    }),
    '0.1': style({
      animationDelay: '0.1s'
    }),
    '0.125': style({
      animationDelay: '0.125s'
    }),
    '0.15': style({
      animationDelay: '0.15s'
    }),
    '0.175': style({
      animationDelay: '0.175s'
    }),
    '0.2': style({
      animationDelay: '0.2s'
    }),
    '0.225': style({
      animationDelay: '0.225s'
    }),
    '5': style({
      animationDelay: '5s'
    }),
    '10': style({
      animationDelay: '10s'
    })
  },
  gradient: style({
    animationDuration: '1.8s',
    animationFillMode: 'forwards',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'linear',
    animationName: keyframes({
      '0%': {
        backgroundPosition: '-500px 0'
      },
      '100%': {
        backgroundPosition: '500px 0'
      }
    }),
    background: 'linear-gradient(to right, rgba(0,0,0,0) 8%, rgb(26, 179, 148) 38%, rgba(0,0,0,0) 54%)',
    position: 'relative'
  })
}