import React from "react";

import intro1 from '../assets/sounds/intro1.wav';
import intro2 from '../assets/sounds/intro2.mp3';
import success from '../assets/sounds/success.mp3';
import success2 from '../assets/sounds/success2.mp3';

import error from '../assets/sounds/error.mp3';
import error2 from '../assets/sounds/error2.mp3';

import ok from '../assets/sounds/ok.mp3';
import ok2 from '../assets/sounds/ok2.mp3';
import switch1 from '../assets/sounds/switch.mp3';
import click from '../assets/sounds/click.wav';
import click2 from '../assets/sounds/click2.wav';
import confirm from '../assets/sounds/confirm.wav';
import confirm2 from '../assets/sounds/confirm2.mp3';
import confirm3 from '../assets/sounds/confirm3.wav';
import Sound from './Sounds'
export default function Play(props) {
    switch (props.type) {
        case 'success':
            return <Sound sound={success} />;
            case 'success2':
                return <Sound sound={success2} />;
        case 'error':
            return <Sound sound={error} />;
            case 'error2':
                return <Sound sound={error2} />;
        case 'intro':
            return <Sound sound={intro1} />;
        case 'intro2':
            return <Sound sound={intro2} />;
        case 'ok':
            return <Sound sound={ok} />;
        case 'ok2':
            return <Sound sound={ok2} />;
        case 'switch1':
            return <Sound sound={switch1} />;
        case 'click':
            return <Sound sound={click} />;
        case 'click2':
            return <Sound sound={click2} />;
        case 'confirm':
            return <Sound sound={confirm} />;
        case 'confirm2':
            return <Sound sound={confirm2} />;
        case 'confirm3':
            return <Sound sound={confirm3} />;
        default:
            return null;
    }

}
