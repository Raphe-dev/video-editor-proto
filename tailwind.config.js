module.exports = {
    theme: {
        screens: {},
        colors: {
            black: {
                default: '#333333',
                light: '#383838',
                lighter: '#3D3D3D',
                lightest: '#4F4F4F',
                dark: '#262626',
                darker: '#1A1A1A',
                darkest: '#0D0D0D'
            },
            white: {
                default: '#F2F2F2',
                dark: '#EDEDED',
                darker: '#E8E8E8',
                darkest: '#E3E3E3',
                light: '#F5F5F5',
                lighter: '#FAFAFA',
                lightest: '#FFF'
            },
            gray: {
                default: '#828282',
                dark: '#737373',
                darker: '#666666',
                darkest: '#595959',
                light: '#8F8F8F',
                lighter: '#A6A6A6',
                lightest: '#C4C4C4'
            },
            accent: {
                default: '#28BABA'
            },
            green: {
                default: '#219653'
            },
            blue: {
                default: '#2D9CDB'
            },
            yellow: {
                default: '#F2C94C'
            },
            red: {
                default: '#FF0000'
            }

        },
        opacity: {
            '0': '0',
            '10': '0.1',
            '20': '0.2',
            '30': '0.3',
            '40': '0.4',
            '50': '0.5',
            '60': '0.6',
            '70': '0.7',
            '80': '0.8',
            '90': '0.9',
            '100': '1'
        },

        spacing: {
            px: '1px',
            '0': '0',
            '1/2': '0.125rem',
            '1': '0.25rem',
            '2': '0.5rem',
            '3': '0.75rem',
            '4': '1rem',
            '5': '1.25rem',
            '6': '1.5rem',
            '8': '2rem',
            '10': '2.5rem',
            '12': '3rem',
            '14': '3.5rem',
            '16': '4rem',
            '18': '4.5rem',
            '20': '5rem',
            '24': '6rem',
            '32': '8rem',
            '40': '10rem',
            '44': '11rem',
            '48': '12rem',
            '56': '14rem',
            '64': '16rem',
            '72': '18rem',
            '80': '20rem'
        },

        fill: {
            current: 'currentColor'
        },

        backgroundColor: theme => theme('colors'),

        backgroundPosition: {
            bottom: 'bottom',
            center: 'center',
            left: 'left',
            right: 'right',
            top: 'top'
        },

        backgroundSize: {
            auto: 'auto',
            cover: 'cover',
            contain: 'contain'
        },

        borderColor: theme => ({
            ...theme('colors'),
            default: theme('currentColor')
        }),

        borderWidth: {
            default: '1px',
            '0': '0',
            '2': '2px',
            '4': '4px',
            '8': '8px'
        },

        border: {
            default: 'none'
        },

        borderRadius: {
            none: '0',
            sm: '0.075rem',
            default: '0.15rem',
            md: '0.275rem',
            lg: '0.5rem',
            full: '9999px'
        },

        boxShadow: {
            xs: '0 0 1px 1px rgba(0, 0, 0, 0.1)',
            sm: '0 1px 2px 2px rgba(0, 0, 0, 0.1)',
            default: '0 1px 3px 3px rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
            md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
            lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
            xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
            outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
            none: 'none'
        },

        cursor: {
            auto: 'auto',
            default: 'default',
            pointer: 'pointer',
            move: 'move',
            grab: 'grab',
            help: 'help',
            text: 'text',
            'zoom-in': 'zoom-in',
            'zoom-out': 'zoom-out',
            'all-scroll': 'all-scroll',
            'not-allowed': 'not-allowed',
            'wait': 'wait'
        },

        flex: {
            '1': '1 1 0%',
            auto: '1 1 auto',
            initial: '0 1 auto',
            none: 'none'
        },

        flexGrow: {
            '0': '0',
            default: '1'
        },

        flexShrink: {
            '0': '0',
            default: '1'
        },

        fontSize: {
            xxs: '0.5rem',
            xs: '0.65rem',
            sm: '0.75rem',
            xsm: '0.85rem',
            base: '1rem',
            md: '1.125rem',
            lg: '1.25rem',
            xl: '1.5rem',
            '2xl': '1.75rem',
            '3xl': '2rem',
            '4xl': '2.5rem',
            '5xl': '3rem',
            '6xl': '4rem'
        },

        letterSpacing: {
            tighter: '-0.05em',
            tight: '-0.025em',
            normal: '0',
            wide: '0.025em',
            wider: '0.05em',
            widest: '0.1em'
        },

        lineHeight: {
            none: '1',
            tight: '1.25',
            snug: '1.375',
            normal: '1.5',
            relaxed: '1.625',
            loose: '2'
        },

        fontWeight: {
            hairline: '100',
            thin: '200',
            light: '300',
            normal: '400',
            medium: '500',
            semibold: '600',
            bold: '700',
            extrabold: '800',
            black: '900'
        },

        fontFamily: {
            'sans': [ 'Roboto', 'Helvetica', 'Arial', 'sans-serif' ]
        },

        height: theme => ({
            auto: 'auto',
            ...theme('spacing'),
            full: '100%',
            screen: '100vh'
        }),

        minHeight: theme => ({
            '0': '0',
            full: '100%',
            ...theme('spacing'),
            screen: '100vh'
        }),

        maxHeight: {
            full: '100%',
            screen: '100vh'
        },

        width: theme => ({
            auto: 'auto',
            ...theme('spacing'),
            '1/2': '50%',
            '1/3': '33.333333%',
            '2/3': '66.666667%',
            '1/4': '25%',
            '2/4': '50%',
            '3/4': '75%',
            '1/5': '20%',
            '2/5': '40%',
            '3/5': '60%',
            '4/5': '80%',
            '1/6': '16.666667%',
            '2/6': '33.333333%',
            '3/6': '50%',
            '4/6': '66.666667%',
            '5/6': '83.333333%',
            full: '100%',
            screen: '100vw'
        }),

        minWidth: theme => ({
            '0': '0',
            ...theme('spacing'),
            full: '100%'
        }),

        maxWidth: theme => ({
            '0': '0',
            ...theme('spacing'),
            full: '100%'
        }),

        zIndex: {
            auto: 'auto',
            '0': '0',
            '1': '1',
            '2': '2',
            '3': '3',
            '4': '4',
            '5': '5',
            '6': '6',
            '7': '7',
            '8': '8',
            '9': '9',
            '10': '10',
            '20': '20',
            '30': '30',
            '100': '100'
        },

        inset: theme => ({
            '0': '0',
            ...theme('spacing')
        }),

        transformOrigin: {
            center: 'center',
            'center-top': '0% 50%',
            top: 'top',
            'top-right': 'top right',
            right: 'right',
            'bottom-right': 'bottom right',
            bottom: 'bottom',
            'bottom-left': 'bottom left',
            left: 'left',
            'top-left': 'top left'
        },

        translate: (theme, { negative }) => ({
            ...theme('spacing'),
            ...negative(theme('spacing')),
            '-full': '-100%',
            '-1/2': '-50%',
            '1/2': '50%',
            full: '100%'
        }),

        scale: {
            '0': '0',
            '10': '.1',
            '25': '.25',
            '50': '.5',
            '75': '.75',
            '100': '1',
            '105': '1.05',
            '110': '1.1',
            '125': '1.25',
            '150': '1.5'
        },

        rotate: {
            '-180': '-180deg',
            '-90': '-90deg',
            '-45': '-45deg',
            '0': '0',
            '45': '45deg',
            '90': '90deg',
            '180': '180deg'
        },

        transitionProperty: {
            none: 'none',
            all: 'all',
            default: 'background-color, border-color, color, fill, stroke, opacity, box-shadow, transform',
            colors: 'background-color, border-color, color, fill, stroke',
            opacity: 'opacity',
            shadow: 'box-shadow',
            transform: 'transform'
        },

        transitionTimingFunction: {
            linear: 'linear',
            in: 'cubic-bezier(0.4, 0, 1, 1)',
            out: 'cubic-bezier(0, 0, 0.2, 1)',
            'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)'
        },

        transitionDuration: {
            base: '200ms',
            '0': '0ms',
            '75': '75ms',
            '100': '100ms',
            '150': '150ms',
            '200': '200ms',
            '300': '300ms',
            '500': '500ms',
            '700': '700ms',
            '1000': '1000ms'
        },

        gridTemplateColumns: {},
        gridColumn: {},
        gridColumnStart: {},
        gridColumnEnd: {},
        gridTemplateRows: {},
        gridRow: {},
        gridRowStart: {},
        gridRowEnd: {},

        extend: {}
    },
    variants: {
        borderWidth: ['last'],
        cursor: ['hover'],
        borderColor: ['focus'],
        textColor: ['hover']
    },
    plugins: []
};
