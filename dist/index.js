function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var reactRedux = require('react-redux');
var react = require('redux-persist/integration/react');
var sip_js = require('sip.js');
var Tone = _interopDefault(require('tone'));
var Select = _interopDefault(require('react-select'));
var reduxDevtoolsExtension = require('redux-devtools-extension');
var thunk = _interopDefault(require('redux-thunk'));
var reduxPersist = require('redux-persist');
var storage = _interopDefault(require('redux-persist/lib/storage'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var styles = {"container":"_styles__container__1H7C6"};

var NEW_USERAGENT = 'NEW_USERAGENT';
var NEW_ACCOUNT = 'NEW_ACCOUNT';
var setNewAccount = function setNewAccount(account) {
  return {
    type: NEW_ACCOUNT,
    payload: account
  };
};

var NEW_SESSION = 'NEW_SESSION';
var NEW_ATTENDED_TRANSFER = 'NEW_ATTENDED_TRANSFER';
var INCOMING_CALL = 'INCOMING_CALL';
var ACCEPT_CALL = 'ACCEPT_CALL';
var DECLINE_CALL = 'DECLINE_CALL';
var SIPSESSION_STATECHANGE = 'SIPSESSION_STATECHANGE';
var CLOSE_SESSION = 'CLOSE_SESSION';
var SIPSESSION_HOLD_REQUEST = 'SIPSESSION_HOLD_REQUEST';
var SIPSESSION_HOLD_FAIL = 'SIPSESSION_HOLD_FAIL';
var SIPSESSION_UNHOLD_REQUEST = 'SIPSESSION_UNHOLD_REQUEST';
var SIPSESSION_UNHOLD_FAIL = 'SIPSESSION_UNHOLD_FAIL';
var SIPSESSION_MUTE_REQUEST = 'SIPSESSION_MUTE_REQUEST';
var SIPSESSION_MUTE_SUCCESS = 'SIPSESSION_MUTE_SUCCESS';
var SIPSESSION_MUTE_FAIL = 'SIPSESSION_MUTE_FAIL';
var SIPSESSION_UNMUTE_REQUEST = 'SIPSESSION_UNMUTE_REQUEST';
var SIPSESSION_UNMUTE_SUCCESS = 'SIPSESSION_UNMUTE_SUCCESS';
var SIPSESSION_UNMUTE_FAIL = 'SIPSESSION_UNMUTE_FAIL';
var SIPSESSION_BLIND_TRANSFER_REQUEST = 'SIPSESSION_BLIND_TRANSFER_REQUEST';
var SIPSESSION_BLIND_TRANSFER_SUCCESS = 'SIPSESSION_BLIND_TRANSFER_SUCCESS';
var SIPSESSION_BLIND_TRANSFER_FAIL = 'SIPSESSION_BLIND_TRANSFER_FAIL';
var SIPSESSION_ATTENDED_TRANSFER_REQUEST = 'SIPSESSION_ATTENDED_TRANSFER_REQUEST';
var SIPSESSION_ATTENDED_TRANSFER_PENDING = 'SIPSESSION_ATTENDED_TRANSFER_PENDING';
var SIPSESSION_ATTENDED_TRANSFER_READY = 'SIPSESSION_ATTENDED_TRANSFER_READY';
var SIPSESSION_ATTENDED_TRANSFER_CANCEL = 'SIPSESSION_ATTENDED_TRANSFER_CANCEL';
var SIPSESSION_ATTENDED_TRANSFER_FAIL = 'SIPSESSION_ATTENDED_TRANSFER_FAIL';
var SIPSESSION_ATTENDED_TRANSFER_SUCCESS = 'SIPSESSION_ATTENDED_TRANSFER_SUCCESS';
var stateChange = function stateChange(newState, id) {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_STATECHANGE,
      payload: {
        state: newState,
        id: id
      }
    });
  };
};
var closeSession = function closeSession(id) {
  return function (dispatch) {
    dispatch({
      type: CLOSE_SESSION,
      payload: id
    });
  };
};
var acceptCall = function acceptCall(session) {
  return {
    type: ACCEPT_CALL,
    payload: session
  };
};
var declineCall = function declineCall(session) {
  return {
    type: DECLINE_CALL,
    payload: session
  };
};
var endCall = function endCall(sessionId) {
  return {
    type: CLOSE_SESSION,
    payload: sessionId
  };
};
var holdCallRequest = function holdCallRequest(session) {
  if (!session.sessionDescriptionHandler || session.state !== sip_js.SessionState.Established) {
    return {
      type: SIPSESSION_HOLD_FAIL
    };
  }

  try {
    session.invite({
      sessionDescriptionHandlerModifiers: [session.sessionDescriptionHandler.holdModifier]
    });
    return {
      type: SIPSESSION_HOLD_REQUEST,
      payload: session.id
    };
  } catch (err) {
    return {
      type: SIPSESSION_HOLD_FAIL
    };
  }
};
var unHoldCallRequest = function unHoldCallRequest(_session, onHolds, sessions) {
  return function (dispatch) {
    for (var _i = 0, _Object$entries = Object.entries(sessions); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          sessionId = _Object$entries$_i[0],
          session = _Object$entries$_i[1];

      if (sessionId in onHolds === false && sessionId !== _session.id) {
        try {
          session.invite({
            sessionDescriptionHandlerModifiers: [session.sessionDescriptionHandler.holdModifier]
          });
          dispatch({
            type: SIPSESSION_HOLD_REQUEST,
            payload: session.id
          });
        } catch (err) {
          dispatch({
            type: SIPSESSION_HOLD_FAIL
          });
        }
      }
    }

    try {
      _session.invite();

      dispatch({
        type: SIPSESSION_UNHOLD_REQUEST,
        payload: _session.id
      });
    } catch (err) {
      dispatch({
        type: SIPSESSION_UNHOLD_FAIL
      });
    }

    return;
  };
};
var blindTransferRequest = function blindTransferRequest() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_BLIND_TRANSFER_REQUEST
    });
  };
};
var blindTransferSuccess = function blindTransferSuccess() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_BLIND_TRANSFER_SUCCESS
    });
  };
};
var blindTransferFail = function blindTransferFail() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_BLIND_TRANSFER_FAIL
    });
  };
};
var attendedTransferRequest = function attendedTransferRequest() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_ATTENDED_TRANSFER_REQUEST
    });
  };
};
var attendedTransferCancel = function attendedTransferCancel() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_ATTENDED_TRANSFER_CANCEL
    });
  };
};
var attendedTransferReady = function attendedTransferReady() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_ATTENDED_TRANSFER_READY
    });
  };
};
var attendedTransferPending = function attendedTransferPending() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_ATTENDED_TRANSFER_PENDING
    });
  };
};
var attendedTransferSuccess = function attendedTransferSuccess() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_ATTENDED_TRANSFER_SUCCESS
    });
  };
};
var attendedTransferFail = function attendedTransferFail() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_ATTENDED_TRANSFER_FAIL
    });
  };
};
var muteRequest = function muteRequest() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_MUTE_REQUEST
    });
  };
};
var muteSuccess = function muteSuccess() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_MUTE_SUCCESS
    });
  };
};
var muteFail = function muteFail() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_MUTE_FAIL
    });
  };
};
var unMuteRequest = function unMuteRequest() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_UNMUTE_REQUEST
    });
  };
};
var unMuteSuccess = function unMuteSuccess() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_UNMUTE_SUCCESS
    });
  };
};
var unMuteFail = function unMuteFail() {
  return function (dispatch) {
    dispatch({
      type: SIPSESSION_UNMUTE_FAIL
    });
  };
};

var AUDIO_INPUT_DEVICES_DETECTED = 'AUDIO_INPUT_DEVICES_DETECTED';
var AUDIO_OUTPUT_DEVICES_DETECTED = 'AUDIO_OUTPUT_DEVICES_DETECTED';
var REMOTE_AUDIO_CONNECTED = 'REMOTE_AUDIO_CONNECTED';
var LOCAL_AUDIO_CONNECTED = 'LOCAL_AUDIO_CONNECTED';
var SET_PRIMARY_OUTPUT = 'SET_PRIMARY_OUTPUT';
var SET_PRIMARY_INPUT = 'SET_PRIMARY_INPUT';
var getInputAudioDevices = function getInputAudioDevices() {
  var inputArray = [];
  navigator.mediaDevices.enumerateDevices().then(function (devices) {
    devices.forEach(function (device) {
      if (device.kind === 'audioinput') {
        inputArray.push(device);
      }
    });
  });
  return {
    type: AUDIO_INPUT_DEVICES_DETECTED,
    payload: inputArray
  };
};
var getOutputAudioDevices = function getOutputAudioDevices() {
  var outputArray = [];
  navigator.mediaDevices.enumerateDevices().then(function (devices) {
    devices.forEach(function (device) {
      if (device.kind === 'audiooutput') {
        outputArray.push(device);
      }
    });
  });
  return {
    type: AUDIO_OUTPUT_DEVICES_DETECTED,
    payload: outputArray
  };
};
var setPrimaryOutput = function setPrimaryOutput(id) {
  return {
    type: SET_PRIMARY_OUTPUT,
    payload: id
  };
};
var setPrimaryInput = function setPrimaryInput(id) {
  return {
    type: SET_PRIMARY_INPUT,
    payload: id
  };
};

var setRemoteAudio = function setRemoteAudio(session) {
  var state = phoneStore.getState();
  var deviceId = state.device.primaryAudioOutput;
  var mediaElement = document.getElementById(session.id);
  var remoteStream = new MediaStream();
  session.sessionDescriptionHandler.peerConnection.getReceivers().forEach(function (receiver) {
    if (receiver.track) {
      remoteStream.addTrack(receiver.track);
    }
  });

  if (mediaElement) {
    mediaElement.setSinkId(deviceId).then(function () {
      mediaElement.srcObject = remoteStream;
      mediaElement.play();
    });
  } else {
    console.log('no media Element');
  }

  phoneStore.dispatch({
    type: REMOTE_AUDIO_CONNECTED
  });
};
var setLocalAudio = function setLocalAudio(session) {
  var state = phoneStore.getState();
  var deviceId = state.device.primaryAudioInput;
  session.sessionDescriptionHandler.peerConnection.getSenders().forEach(function (sender) {
    console.log(sender);

    if (sender.track && sender.track.kind === 'audio') {
      var audioDeviceId = deviceId;
      navigator.mediaDevices.getUserMedia({
        audio: {
          deviceId: audioDeviceId
        }
      }).then(function (stream) {
        var audioTrack = stream.getAudioTracks();
        sender.replaceTrack(audioTrack[0]);
      });
    }
  });
  phoneStore.dispatch({
    type: LOCAL_AUDIO_CONNECTED
  });
};
var cleanupMedia = function cleanupMedia(sessionId) {
  var mediaElement = document.getElementById(sessionId);

  if (mediaElement) {
    mediaElement.srcObject = null;
    mediaElement.pause();
  }
};

var DTMF_MATRIX = {
  1: [697, 1209],
  2: [697, 1336],
  3: [697, 1477],
  A: [697, 1633],
  4: [770, 1209],
  5: [770, 1336],
  6: [770, 1477],
  B: [770, 1633],
  7: [852, 1209],
  8: [852, 1336],
  9: [852, 1477],
  C: [852, 1633],
  0: [941, 1209],
  '*': [941, 1336],
  '#': [941, 1477],
  D: [941, 1633]
};
var Synth = Tone.PolySynth && new Tone.PolySynth(2, Tone.Synth);
var FMSynth = Tone.PolySynth && new Tone.PolySynth(2, Tone.FMSynth);
var playDTMF = function playDTMF(key, deviceId) {
  var obj = DTMF_MATRIX[key];

  if (!obj) {
    console.log('invalid DTMF tone input');
  }

  Synth.volume.value = -22;
  Synth.set({
    oscillator: {
      type: 'sine'
    },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.2,
      release: 0.02
    }
  });

  if (deviceId !== 'default') {
    var mediaElement = document.getElementById('tone');

    if (mediaElement) {
      var dest = Tone.context.createMediaStreamDestination();
      Synth.connect(dest);
      mediaElement.setSinkId(deviceId).then(function () {
        mediaElement.srcObject = dest.stream;
        mediaElement.play();
      });
    }
  } else {
    Synth.toMaster();
  }

  Synth.triggerAttackRelease(obj, 0.3);
};
var callDisconnect = function callDisconnect(deviceId) {
  FMSynth.triggerAttack(['C4', 'E4'], '+0.1');
  FMSynth.triggerRelease(['C4', 'E4'], '+0.14');
  FMSynth.triggerAttack(['D4', 'G4'], '+0.14');
  FMSynth.triggerRelease(['D4', 'G4'], '+0.18');

  if (deviceId !== 'default') {
    var mediaElement = document.getElementById('tone');

    if (mediaElement) {
      var dest = Tone.context.createMediaStreamDestination();
      Synth.connect(dest);
      mediaElement.setSinkId(deviceId).then(function () {
        mediaElement.srcObject = dest.stream;
        mediaElement.play();
      });
    }
  } else {
    FMSynth.toMaster();
  }
};

var TonePlayer = function TonePlayer() {
  var _this = this;

  this.ringtone = function (deviceId) {
    var mediaElement = document.getElementById('ringtone');

    if (deviceId !== 'default') {
      if (mediaElement) {
        mediaElement.setSinkId(deviceId).then(function () {
          mediaElement.play();
        });
      } else {
        console.log('no media Element');
      }
    } else {
      mediaElement.play();
    }
  };

  this.ringback = function (deviceId) {
    var dest = Tone.context.createMediaStreamDestination();
    console.log(dest);
    Synth.set({
      oscillator: {
        type: 'sine'
      },
      envelope: {
        attack: 0.02,
        decay: 0.1,
        sustain: 0.2,
        release: 0.02
      }
    }).connect(dest);

    if (deviceId !== 'default') {
      var mediaElement = document.getElementById('tone');

      if (mediaElement) {
        var _dest = Tone.context.createMediaStreamDestination();

        Synth.connect(_dest);
        mediaElement.setSinkId(deviceId).then(function () {
          mediaElement.srcObject = _dest.stream;
          mediaElement.play();
        });
      }
    } else {
      Synth.toMaster();
    }

    _this.loop = new Tone.Loop(function (time) {
      Synth.triggerAttack([440, 480]);
      Synth.triggerRelease([440, 480], time + 2);
    }, 6);

    _this.loop.start(0);

    Tone.Transport.start();
  };

  this.stop = function () {
    try {
      _this.loop.stop(0);

      Tone.Transport.stop();
      Synth.triggerRelease([440, 480]);
    } catch (_unused) {
      var mediaElement = document.getElementById('ringtone');
      mediaElement.pause();
    }
  };
};

var ToneManager = /*#__PURE__*/function () {
  function ToneManager() {}

  var _proto = ToneManager.prototype;

  _proto.playRing = function playRing(type) {
    var state = phoneStore.getState();
    var deviceId = state.device.primaryAudioOutput;

    if (this.currentTone) {
      this.currentTone.stop();
      this.currentTone = undefined;
    }

    if (type === 'ringback') {
      this.currentTone = new TonePlayer();
      this.currentTone.ringback(deviceId);
    } else if (type == 'ringtone') {
      this.currentTone = new TonePlayer();
      this.currentTone.ringtone(deviceId);
    }
  };

  _proto.stopAll = function stopAll() {
    if (this.currentTone) {
      this.currentTone.stop();
      this.currentTone = undefined;
    }
  };

  return ToneManager;
}();

var toneManager = new ToneManager();

var SessionStateHandler = function SessionStateHandler(session) {
  var _this = this;

  this.stateChange = function (newState) {
    switch (newState) {
      case sip_js.SessionState.Establishing:
        toneManager.playRing('ringback');
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        });
        break;

      case sip_js.SessionState.Established:
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        });
        toneManager.stopAll();
        setLocalAudio(_this.session);
        setRemoteAudio(_this.session);
        break;

      case sip_js.SessionState.Terminating:
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        });
        toneManager.stopAll();
        cleanupMedia(_this.session.id);
        break;

      case sip_js.SessionState.Terminated:
        phoneStore.dispatch({
          type: SIPSESSION_STATECHANGE
        });
        toneManager.stopAll();
        setTimeout(function () {
          phoneStore.dispatch({
            type: CLOSE_SESSION,
            payload: _this.session.id
          });
        }, 5000);
        break;

      default:
        console.log("Unknown session state change: " + newState);
        break;
    }
  };

  this.session = session;
};
var getFullNumber = function getFullNumber(number) {
  if (number.length < 10) {
    return number;
  }

  var fullNumber = "+" + phoneStore.getState().sipAccounts.sipAccount._config.defaultCountryCode + number;

  if (number.includes('+') && number.length === 10) {
    fullNumber = "" + number;
  }

  console.log(fullNumber);
  return fullNumber;
};
var statusMask = function statusMask(status) {
  switch (status) {
    case 'Established':
      return 'Connected';

    case 'Establishing':
      return 'Calling...';

    case 'Initial':
      return 'Initial';

    case 'Terminating':
    case 'Terminated':
      return 'Ended';

    default:
      return 'Unknown Status';
  }
};
var getDurationDisplay = function getDurationDisplay(duration) {
  var minutes = Math.floor(duration / 60);
  var hours = Math.floor(minutes / 60);
  minutes = minutes % 60;
  var seconds = duration % 60;
  var dh, dm, ds;

  if (hours && hours < 10) {
    dh = "0" + hours + ":";
  } else if (hours) {
    dh = hours + ":";
  } else {
    dh = '00:';
  }

  if (minutes && minutes < 10) {
    dm = "0" + minutes + ":";
  } else if (minutes) {
    dm = minutes + ":";
  } else {
    dm = '00:';
  }

  if (seconds && seconds < 10) {
    ds = "0" + seconds;
  } else if (seconds) {
    ds = "" + seconds;
  } else {
    ds = '00';
  }

  return "" + (hours ? dh : '') + dm + ds;
};

var IncomingSessionStateHandler = /*#__PURE__*/function () {
  function IncomingSessionStateHandler(incomingSession) {
    var _this = this;

    this.stateChange = function (newState) {
      switch (newState) {
        case sip_js.SessionState.Establishing:
          phoneStore.dispatch({
            type: SIPSESSION_STATECHANGE
          });
          break;

        case sip_js.SessionState.Established:
          phoneStore.dispatch({
            type: SIPSESSION_STATECHANGE
          });

          _this.holdAll();

          setLocalAudio(_this.incomingSession);
          setRemoteAudio(_this.incomingSession);
          break;

        case sip_js.SessionState.Terminating:
          phoneStore.dispatch({
            type: SIPSESSION_STATECHANGE
          });
          cleanupMedia(_this.incomingSession.id);
          break;

        case sip_js.SessionState.Terminated:
          phoneStore.dispatch({
            type: SIPSESSION_STATECHANGE
          });
          setTimeout(function () {
            phoneStore.dispatch({
              type: CLOSE_SESSION,
              payload: _this.incomingSession.id
            });
          }, 5000);
          break;

        default:
          console.log("Unknown session state change: " + newState);
          break;
      }
    };

    this.incomingSession = incomingSession;
  }

  var _proto = IncomingSessionStateHandler.prototype;

  _proto.holdAll = function holdAll() {
    var state = phoneStore.getState();
    var onHolds = state.sipSessions.onHold;
    var sessions = state.sipSessions.sessions;

    for (var _i = 0, _Object$entries = Object.entries(sessions); _i < _Object$entries.length; _i++) {
      var _Object$entries$_i = _Object$entries[_i],
          sessionId = _Object$entries$_i[0],
          session = _Object$entries$_i[1];

      if (sessionId in onHolds === false && sessionId !== this.incomingSession.id) {
        try {
          holdCallRequest(session);
          phoneStore.dispatch({
            type: SIPSESSION_HOLD_REQUEST,
            payload: session.id
          });
          return;
        } catch (err) {
          return;
        }
      }
    }
  };

  return IncomingSessionStateHandler;
}();

var SIPAccount = /*#__PURE__*/function () {
  function SIPAccount(sipConfig, sipCredentials) {
    var _this = this;

    this._config = sipConfig;
    this._credentials = sipCredentials;
    var uri = sip_js.UserAgent.makeURI('sip:' + sipCredentials.sipuri);

    if (!uri) {
      throw new Error('Failed to create URI');
    }

    var transportOptions = {
      server: sipConfig.websocket
    };
    var userAgentOptions = {
      autoStart: false,
      autoStop: true,
      noAnswerTimeout: sipConfig.noAnswerTimeout || 30,
      logBuiltinEnabled: process.env.NODE_ENV !== 'production',
      logConfiguration: process.env.NODE_ENV !== 'production',
      logLevel: process.env.NODE_ENV !== 'production' ? 'debug' : 'error',
      authorizationPassword: sipCredentials.password,
      userAgentString: 'OTF-react-sip-phone',
      hackWssInTransport: true,
      transportOptions: transportOptions,
      uri: uri,
      sessionDescriptionHandlerFactoryOptions: {
        constraints: {
          audio: {
            deviceId: 'default'
          },
          video: false
        },
        alwaysAcquireMediaFirst: true,
        iceCheckingTimeout: 500
      }
    };
    var registererOptions = {
      expires: 300,
      logConfiguration: process.env.NODE_ENV !== 'production'
    };
    this._userAgent = new sip_js.UserAgent(userAgentOptions);
    this._registerer = new sip_js.Registerer(this._userAgent, registererOptions);
    this.setupDelegate();

    this._userAgent.start().then(function () {
      _this._registerer.register();

      _this.setupRegistererListener();

      phoneStore.dispatch({
        type: NEW_USERAGENT,
        payload: _this._userAgent
      });
    });
  }

  var _proto = SIPAccount.prototype;

  _proto.setupDelegate = function setupDelegate() {
    this._userAgent.delegate = {
      onInvite: function onInvite(invitation) {
        var incomingSession = invitation;
        incomingSession.delegate = {
          onRefer: function onRefer(referral) {
            console.log(referral);
          }
        };
        phoneStore.dispatch({
          type: INCOMING_CALL,
          payload: incomingSession
        });
        var stateHandler = new IncomingSessionStateHandler(incomingSession);
        incomingSession.stateChange.addListener(stateHandler.stateChange);
      }
    };
  };

  _proto.setupRegistererListener = function setupRegistererListener() {
    this._registerer.stateChange.addListener(function (newState) {
      switch (newState) {
        case sip_js.RegistererState.Initial:
          console.log('The user registration has initialized  ');
          break;

        case sip_js.RegistererState.Registered:
          console.log('The user is registered ');
          break;

        case sip_js.RegistererState.Unregistered:
          console.log('The user is unregistered ');
          break;

        case sip_js.RegistererState.Terminated:
          console.log('The user is terminated ');
          break;
      }
    });
  };

  _proto.makeCall = function makeCall(number) {
    var target = sip_js.UserAgent.makeURI("sip:" + getFullNumber(number) + "@sip.reper.io;user=phone");

    if (target) {
      console.log("Calling " + number);
      var inviter = new sip_js.Inviter(this._userAgent, target);
      var outgoingSession = inviter;
      outgoingSession.delegate = {
        onRefer: function onRefer(referral) {
          console.log('Referred: ' + referral);
        }
      };
      phoneStore.dispatch({
        type: NEW_SESSION,
        payload: outgoingSession
      });
      var stateHandler = new SessionStateHandler(outgoingSession);
      outgoingSession.stateChange.addListener(stateHandler.stateChange);
      outgoingSession.invite().then(function () {
        console.log('Invite sent!');
      })["catch"](function (error) {
        console.log(error);
      });
    } else {
      console.log("Failed to establish session for outgoing call to " + number);
    }
  };

  return SIPAccount;
}();

var SET_CREDENTIALS = 'SET_CREDENTIALS';
var SET_CONFIG = 'SET_CONFIG';
var setCredentials = function setCredentials(uri, password) {
  if (uri === void 0) {
    uri = '';
  }

  if (password === void 0) {
    password = '';
  }

  return {
    type: SET_CREDENTIALS,
    payload: {
      uri: uri,
      password: password
    }
  };
};
var setPhoneConfig = function setPhoneConfig(config) {
  return {
    type: SET_CONFIG,
    payload: config
  };
};

var SipWrapper = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(SipWrapper, _React$Component);

  function SipWrapper() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = SipWrapper.prototype;

  _proto.componentDidMount = function componentDidMount() {
    console.log('mounted');

    if (this.props.sipCredentials.password) {
      this.initializeSip();
    }
  };

  _proto.initializeSip = function initializeSip() {
    var account = new SIPAccount(this.props.sipConfig, this.props.sipCredentials);
    this.props.setNewAccount(account);
  };

  _proto.render = function render() {
    return React.createElement(React.Fragment, null, this.props.children);
  };

  return SipWrapper;
}(React.Component);

var mapStateToProps = function mapStateToProps() {
  return {};
};

var actions = {
  setNewAccount: setNewAccount,
  setPhoneConfig: setPhoneConfig,
  setCredentials: setCredentials
};
var SipWrapper$1 = reactRedux.connect(mapStateToProps, actions)(SipWrapper);

var styles$1 = {"container":"_Status__container__Adysl","incoming":"_Status__incoming__14y58","dialpad":"_Status__dialpad__24i7u","closed":"_Status__closed__3nIZK","dialpadButton":"_Status__dialpadButton__38DZj","dialpadButtonLetters":"_Status__dialpadButtonLetters__N-jqm","dialpadRow":"_Status__dialpadRow__19SxG","actionButton":"_Status__actionButton__1hhhF","on":"_Status__on__3ZwLv","endCallButton":"_Status__endCallButton__3z8u3","startCallButton":"_Status__startCallButton__3UW76","actionsContainer":"_Status__actionsContainer__2kDeL","transferMenu":"_Status__transferMenu__1yjIy","transferInput":"_Status__transferInput__2tho8","transferButtons":"_Status__transferButtons__Rc_m0","userString":"_Status__userString__gelBY","settingsButton":"_Status__settingsButton__3TfJl","settingsMenu":"_Status__settingsMenu__6JtnT","dropdowns":"_Status__dropdowns__2FMhO","dropdownRow":"_Status__dropdownRow__2NuIJ","dropdownIcon":"_Status__dropdownIcon__1K5Gw"};

var settingsIcon = require("./settings-24px~HQuidduc.svg");

var micIcon = require("./mic-24px~xExSpqQP.svg");

var soundIcon = require("./volume_up-24px~qJQJhpOr.svg");

var Status = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Status, _React$Component);

  function Status() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      settingsMenu: false
    };
    return _this;
  }

  var _proto = Status.prototype;

  _proto.componentDidMount = function componentDidMount() {
    this.props.getInputAudioDevices();
    this.props.getOutputAudioDevices();
  };

  _proto.mapOptions = function mapOptions(options) {
    var list = [];
    options.map(function (option) {
      list.push({
        value: option.deviceId,
        label: option.label
      });
    });
    return list;
  };

  _proto.handleChangeDevice = function handleChangeDevice(type, id) {
    if (type === 'out') {
      this.props.setPrimaryOutput(id);
    } else {
      this.props.setPrimaryInput(id);
    }
  };

  _proto.render = function render() {
    var _this2 = this;

    var props = this.props,
        state = this.state;
    var inputs = this.mapOptions(props.inputs);
    var outputs = this.mapOptions(props.outputs);
    return React.createElement(React.Fragment, null, React.createElement("div", {
      className: styles$1.container
    }, React.createElement("div", {
      className: styles$1.userString
    }, props.name), React.createElement("div", {
      id: styles$1.settingsButton,
      className: state.settingsMenu ? styles$1.on : '',
      onClick: function onClick() {
        return _this2.setState({
          settingsMenu: !state.settingsMenu
        });
      }
    }, React.createElement("img", {
      src: settingsIcon
    }))), React.createElement("div", {
      id: styles$1.settingsMenu,
      className: state.settingsMenu ? '' : styles$1.closed
    }, React.createElement("hr", {
      style: {
        width: '100%'
      }
    }), React.createElement("div", {
      className: styles$1.dropdownRow
    }, React.createElement("img", {
      className: styles$1.dropdownIcon,
      src: soundIcon
    }), React.createElement(Select, {
      placeholder: "Select Output...",
      value: outputs.find(function (output) {
        return output.value === props.primaryOutput;
      }) || null,
      onChange: function onChange(option) {
        return _this2.handleChangeDevice('out', option.value);
      },
      options: outputs,
      id: styles$1.dropdowns
    })), React.createElement("div", {
      className: styles$1.dropdownRow
    }, React.createElement("img", {
      className: styles$1.dropdownIcon,
      src: micIcon
    }), React.createElement(Select, {
      placeholder: "Select Input...",
      value: inputs.find(function (input) {
        return input.value === props.primaryInput;
      }),
      onChange: function onChange(option) {
        return _this2.handleChangeDevice('in', option.value);
      },
      options: inputs,
      id: styles$1.dropdowns
    })), React.createElement("hr", {
      style: {
        width: '100%'
      }
    })));
  };

  return Status;
}(React.Component);

var mapStateToProps$1 = function mapStateToProps(state) {
  return {
    inputs: state.device.audioInput,
    outputs: state.device.audioOutput,
    primaryInput: state.device.primaryAudioInput,
    primaryOutput: state.device.primaryAudioOutput
  };
};

var actions$1 = {
  setPrimaryInput: setPrimaryInput,
  setPrimaryOutput: setPrimaryOutput,
  getInputAudioDevices: getInputAudioDevices,
  getOutputAudioDevices: getOutputAudioDevices
};
var Status$1 = reactRedux.connect(mapStateToProps$1, actions$1)(Status);

var styles$2 = {"container":"_Phone__container__33s4p","incoming":"_Phone__incoming__3dASG","dialpad":"_Phone__dialpad__-iUpI","closed":"_Phone__closed__1Yn0M","dialpadButton":"_Phone__dialpadButton__2Mev0","dialpadButtonLetters":"_Phone__dialpadButtonLetters__30C7x","dialpadRow":"_Phone__dialpadRow__ftZ8R","actionButton":"_Phone__actionButton__1gnBl","on":"_Phone__on__11LDZ","endCallButton":"_Phone__endCallButton__EoCL2","startCallButton":"_Phone__startCallButton__PaJuy","actionsContainer":"_Phone__actionsContainer__25gV2","transferMenu":"_Phone__transferMenu__1yYD-","transferInput":"_Phone__transferInput__ovMXl","transferButtons":"_Phone__transferButtons__1-bn8"};

var DialButton = function DialButton(_ref) {
  var text = _ref.text,
      click = _ref.click,
      letters = _ref.letters;
  return React.createElement("div", {
    id: "sip-dial-button",
    className: styles$2.dialpadButton,
    onClick: function onClick() {
      return click();
    }
  }, text, React.createElement("div", {
    style: {
      opacity: letters === '1' ? 0 : 1
    },
    className: styles$2.dialpadButtonLetters
  }, letters));
};

var getButtonLetters = function getButtonLetters(value) {
  switch (value) {
    case '1':
      return '1';

    case '2':
      return 'ABC';

    case '3':
      return 'DEF';

    case '4':
      return 'GHI';

    case '5':
      return 'JKL';

    case '6':
      return 'MNO';

    case '7':
      return 'PQRS';

    case '8':
      return 'TUV';

    case '9':
      return 'WXYZ';

    case '0':
      return '+';

    default:
      return '';
  }
};

var Dialpad = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Dialpad, _React$Component);

  function Dialpad(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.topRow = [];
    _this.middleRow = [];
    _this.bottomRow = [];

    for (var x = 1; x < 4; x++) {
      _this.topRow.push(_this.getButton(x.toString()));
    }

    for (var _x = 4; _x < 7; _x++) {
      _this.middleRow.push(_this.getButton(_x.toString()));
    }

    for (var _x2 = 7; _x2 < 10; _x2++) {
      _this.bottomRow.push(_this.getButton(_x2.toString()));
    }

    return _this;
  }

  var _proto = Dialpad.prototype;

  _proto.getButton = function getButton(value) {
    var _this2 = this;

    return React.createElement(DialButton, {
      key: value,
      text: value,
      letters: getButtonLetters(value),
      click: function click() {
        return _this2.handleClick(value);
      }
    });
  };

  _proto.handleClick = function handleClick(value) {
    if (this.props.session.state === sip_js.SessionState.Established) {
      this.sendDTMF(value);
      playDTMF(value, this.props.deviceId);
    }
  };

  _proto.sendDTMF = function sendDTMF(value) {
    var options = {
      requestOptions: {
        body: {
          contentDisposition: 'render',
          contentType: 'application/dtmf-relay',
          content: "Signal=" + value + "\r\nDuration=1000"
        }
      }
    };
    this.props.session.info(options);
  };

  _proto.render = function render() {
    return React.createElement("div", {
      className: this.props.open ? '' : styles$2.closed,
      id: styles$2.dialpad
    }, React.createElement("div", {
      className: styles$2.dialpadRow
    }, this.topRow), React.createElement("div", {
      className: styles$2.dialpadRow
    }, this.middleRow), React.createElement("div", {
      className: styles$2.dialpadRow
    }, this.bottomRow), React.createElement("div", {
      className: styles$2.dialpadRow
    }, this.getButton('*'), this.getButton('0'), this.getButton('#')));
  };

  return Dialpad;
}(React.Component);

var mapStateToProps$2 = function mapStateToProps(state) {
  return {
    deviceId: state.device.primaryAudioOutput
  };
};

var actions$2 = {};
var Dialpad$1 = reactRedux.connect(mapStateToProps$2, actions$2)(Dialpad);

var holdIcon = require("./phone_paused-24px~TWxpQtZf.svg");

var Hold = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Hold, _React$Component);

  function Hold() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Hold.prototype;

  _proto.hold = function hold() {
    if (this.checkHoldState()) {
      this.props.unHoldCallRequest(this.props.session, this.props.onHold, this.props.sessions);
    } else {
      this.props.holdCallRequest(this.props.session);
    }

    return;
  };

  _proto.checkHoldState = function checkHoldState() {
    return this.props.onHold.includes(this.props.session.id);
  };

  _proto.render = function render() {
    var _this = this;

    return React.createElement("button", {
      className: this.checkHoldState() ? styles$2.on : '',
      id: styles$2.actionButton,
      onClick: function onClick() {
        return _this.hold();
      }
    }, React.createElement("img", {
      src: holdIcon
    }));
  };

  return Hold;
}(React.Component);

var mapStateToProps$3 = function mapStateToProps(state) {
  return {
    stateChanged: state.sipSessions.stateChanged,
    sessions: state.sipSessions.sessions,
    userAgent: state.sipAccounts.userAgent,
    onHold: state.sipSessions.onHold
  };
};

var actions$3 = {
  holdCallRequest: holdCallRequest,
  unHoldCallRequest: unHoldCallRequest
};
var Hold$1 = reactRedux.connect(mapStateToProps$3, actions$3)(Hold);

var micOffIcon = require("./mic_off-24px~bjejwOqd.svg");

var Mute = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Mute, _React$Component);

  function Mute() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      onMute: false
    };
    return _this;
  }

  var _proto = Mute.prototype;

  _proto.mute = function mute() {
    var _this2 = this;

    if (this.state.onMute) {
      this.props.unMuteRequest();
      return new Promise(function (resolve, reject) {
        if (!_this2.props.session.sessionDescriptionHandler || _this2.props.session.state !== sip_js.SessionState.Established) {
          _this2.props.unMuteFail();

          reject('No session to mute');
          return;
        }

        try {
          var pc = _this2.props.session.sessionDescriptionHandler.peerConnection;
          pc.getSenders().forEach(function (stream) {
            if (stream.track && stream.track.kind === 'audio') {
              stream.track.enabled = true;
            }
          });

          _this2.props.unMuteSuccess();

          _this2.setState({
            onMute: false
          });

          resolve();
          return;
        } catch (err) {
          _this2.props.unMuteFail();

          reject(err);
          return;
        }
      });
    }

    if (!this.state.onMute) {
      return new Promise(function (resolve, reject) {
        if (!_this2.props.session.sessionDescriptionHandler || _this2.props.session.state !== sip_js.SessionState.Established) {
          _this2.props.muteFail();

          reject('No session to mute');
          return;
        }

        try {
          _this2.props.muteRequest();

          var pc = _this2.props.session.sessionDescriptionHandler.peerConnection;
          console.log(pc.getSenders());
          pc.getSenders().forEach(function (stream) {
            if (stream.track && stream.track.kind === 'audio') {
              stream.track.enabled = false;
            }
          });

          _this2.props.muteSuccess();

          _this2.setState({
            onMute: true
          });

          resolve();
          return;
        } catch (err) {
          _this2.props.muteFail();

          reject(err);
          return;
        }
      });
    }

    this.props.muteFail();
    return;
  };

  _proto.render = function render() {
    var _this3 = this;

    return React.createElement("div", {
      className: this.state.onMute ? styles$2.on : '',
      id: styles$2.actionButton,
      onClick: function onClick() {
        return _this3.mute();
      }
    }, React.createElement("img", {
      src: micOffIcon
    }));
  };

  return Mute;
}(React.Component);

var mapStateToProps$4 = function mapStateToProps(state) {
  return {
    stateChanged: state.sipSessions.stateChanged,
    sessions: state.sipSessions.sessions,
    userAgent: state.sipAccounts.userAgent
  };
};

var actions$4 = {
  muteRequest: muteRequest,
  muteSuccess: muteSuccess,
  muteFail: muteFail,
  unMuteRequest: unMuteRequest,
  unMuteSuccess: unMuteSuccess,
  unMuteFail: unMuteFail
};
var Mute$1 = reactRedux.connect(mapStateToProps$4, actions$4)(Mute);

var transferIcon = require("./arrow_forward-24px~UJhdZXVe.svg");

var BlindTransfer = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(BlindTransfer, _React$Component);

  function BlindTransfer() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = BlindTransfer.prototype;

  _proto.blindTransferCall = function blindTransferCall() {
    this.props.blindTransferRequest();
    var target = sip_js.UserAgent.makeURI("sip:" + getFullNumber(this.props.destination) + "@sip.reper.io;user=phone");

    if (target) {
      try {
        this.props.session.refer(target);
        this.props.blindTransferSuccess();
      } catch (err) {
        console.log(err);
      }
    } else {
      this.props.blindTransferFail();
    }
  };

  _proto.render = function render() {
    var _this = this;

    return React.createElement(React.Fragment, null, React.createElement("button", {
      className: styles$2.transferButtons,
      onClick: function onClick() {
        return _this.blindTransferCall();
      }
    }, React.createElement("img", {
      src: transferIcon
    })));
  };

  return BlindTransfer;
}(React.Component);

var mapStateToProps$5 = function mapStateToProps(state) {
  return {
    stateChanged: state.sipSessions.stateChanged,
    sessions: state.sipSessions.sessions,
    userAgent: state.sipAccounts.userAgent
  };
};

var actions$5 = {
  blindTransferRequest: blindTransferRequest,
  blindTransferSuccess: blindTransferSuccess,
  blindTransferFail: blindTransferFail
};
var BlindTranfer = reactRedux.connect(mapStateToProps$5, actions$5)(BlindTransfer);

var attendedIcon = require("./phone_in_talk-24px~DQfZjkDQ.svg");

var declineIcon = require("./call_end-24px~HrwYCAOf.svg");

var AttendedTransfer = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(AttendedTransfer, _React$Component);

  function AttendedTransfer() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      attendedTransferSessionPending: null,
      attendedTransferSessionReady: null
    };
    return _this;
  }

  var _proto = AttendedTransfer.prototype;

  _proto.attendedTransferCall = function attendedTransferCall() {
    var _this2 = this;

    this.holdAll();
    this.props.attendedTransferRequest();
    var target = sip_js.UserAgent.makeURI("sip:" + getFullNumber(this.props.destination) + "@sip.reper.io;user=phone");

    if (target) {
      var inviter = new sip_js.Inviter(this.props.userAgent, target);
      var outgoingSession = inviter;
      phoneStore.dispatch({
        type: NEW_ATTENDED_TRANSFER,
        payload: outgoingSession
      });
      this.setState({
        attendedTransferSessionPending: outgoingSession
      });
      outgoingSession.stateChange.addListener(function (newState) {
        switch (newState) {
          case sip_js.SessionState.Initial:
          case sip_js.SessionState.Establishing:
            _this2.props.stateChange(newState, outgoingSession.id);

            _this2.props.attendedTransferPending();

            break;

          case sip_js.SessionState.Established:
            _this2.setState({
              attendedTransferSessionReady: outgoingSession
            });

            _this2.props.attendedTransferReady();

            _this2.setState({
              attendedTransferSessionPending: false
            });

            _this2.props.stateChange(newState, outgoingSession.id);

            break;

          case sip_js.SessionState.Terminating:
            _this2.props.stateChange(newState, outgoingSession.id);

            break;

          case sip_js.SessionState.Terminated:
            _this2.props.stateChange(newState, outgoingSession.id);

            _this2.attendedTransferClear();

            setTimeout(function () {
              _this2.props.closeSession(outgoingSession.id);
            }, 5000);
            break;

          default:
            console.log("Unknown session state change: " + newState);
            break;
        }
      });
      outgoingSession.invite()["catch"](function (error) {
        _this2.props.attendedTransferFail();

        console.log(error);
      });
    } else {
      this.props.attendedTransferFail();
    }
  };

  _proto.attendedTransferClear = function attendedTransferClear() {
    this.setState({
      attendedTransferSessionPending: null
    });
    this.setState({
      attendedTransferSessionReady: null
    });
    this.props.started(false);
  };

  _proto.connectAttendedTransfer = function connectAttendedTransfer(attendedTransferSession) {
    try {
      this.props.session.refer(attendedTransferSession);
      this.props.attendedTransferSuccess();
      this.setState({
        attendedTransferSessionReady: null
      });
    } catch (err) {
      console.log(err);
    }
  };

  _proto.cancelAttendedTransfer = function cancelAttendedTransfer(attendedTransferSession) {
    attendedTransferSession.cancel();
    this.props.attendedTransferCancel();
    this.setState({
      attendedTransferSessionPending: null
    });
    this.setState({
      attendedTransferSession: null
    });
  };

  _proto.holdAll = function holdAll() {
    var state = phoneStore.getState();
    var onHolds = state.sipSessions.onHold;

    if (this.props.session.id in onHolds === false) {
      try {
        this.props.holdCallRequest(this.props.session);
        return;
      } catch (err) {
        return;
      }
    }
  };

  _proto.render = function render() {
    var _this3 = this;

    if (this.state.attendedTransferSessionReady) {
      return React.createElement(React.Fragment, null, React.createElement(Phone$1, {
        session: this.state.attendedTransferSessionReady,
        phoneConfig: {
          disabledButtons: ['numpad', 'transfer']
        }
      }), React.createElement("button", {
        className: styles$2.transferButtons,
        onClick: function onClick() {
          _this3.props.started(false);

          _this3.connectAttendedTransfer(_this3.state.attendedTransferSessionReady);
        }
      }, React.createElement("img", {
        src: transferIcon
      })));
    } else if (this.state.attendedTransferSessionPending) {
      return React.createElement("button", {
        className: styles$2.endCallButton,
        onClick: function onClick() {
          _this3.props.started(false);

          _this3.cancelAttendedTransfer(_this3.state.attendedTransferSessionPending);
        }
      }, React.createElement("img", {
        src: declineIcon
      }));
    } else {
      return React.createElement("button", {
        className: styles$2.transferButtons,
        onClick: function onClick() {
          _this3.props.started(true);

          _this3.attendedTransferCall();
        }
      }, React.createElement("img", {
        src: attendedIcon
      }));
    }
  };

  return AttendedTransfer;
}(React.Component);

var mapStateToProps$6 = function mapStateToProps(state) {
  return {
    stateChanged: state.sipSessions.stateChanged,
    sessions: state.sipSessions.sessions,
    userAgent: state.sipAccounts.userAgent
  };
};

var actions$6 = {
  holdCallRequest: holdCallRequest,
  attendedTransferRequest: attendedTransferRequest,
  attendedTransferCancel: attendedTransferCancel,
  attendedTransferReady: attendedTransferReady,
  attendedTransferPending: attendedTransferPending,
  attendedTransferSuccess: attendedTransferSuccess,
  attendedTransferFail: attendedTransferFail,
  stateChange: stateChange,
  closeSession: closeSession
};
var AttendedTransfer$1 = reactRedux.connect(mapStateToProps$6, actions$6)(AttendedTransfer);

var dialpadIcon = require("./dialpad-24px~cidqBzRK.svg");

var Phone = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Phone, _React$Component);

  function Phone(props) {
    var _this;

    _this = _React$Component.call(this, props) || this;
    _this.state = {
      dialpadOpen: false,
      transferMenu: false,
      ended: false,
      transferDialString: '',
      attendedTransferStarted: false,
      duration: 0,
      counterStarted: false
    };
    _this.attendedProcess = _this.attendedProcess.bind(_assertThisInitialized(_this));
    return _this;
  }

  var _proto = Phone.prototype;

  _proto.componentDidUpdate = function componentDidUpdate(newProps) {
    if (newProps.session.state === sip_js.SessionState.Established && !this.state.counterStarted) {
      this.handleCounter();
    }

    if (newProps.session.state === sip_js.SessionState.Terminated && this.state.ended === false) {
      this.setState({
        ended: true
      });
    }
  };

  _proto.endCall = function endCall() {
    var _this2 = this;

    if (this.props.session.state === sip_js.SessionState.Established) {
      this.props.session.bye();
    } else if (this.props.session.state === sip_js.SessionState.Initial || this.props.session.state === sip_js.SessionState.Establishing) {
      toneManager.stopAll();
      callDisconnect(this.props.deviceId);
      this.props.session.cancel();
    }

    this.setState({
      ended: true
    });
    setTimeout(function () {
      _this2.props.session.dispose();

      _this2.props.endCall(_this2.props.session.id);
    }, 5000);
  };

  _proto.attendedProcess = function attendedProcess(bool) {
    this.setState({
      attendedTransferStarted: bool
    });
  };

  _proto.handleCounter = function handleCounter() {
    var _this3 = this;

    if (this.props.session && this.props.session.state !== sip_js.SessionState.Terminated) {
      if (this.state.counterStarted === false) {
        this.setState({
          counterStarted: true
        });
      }

      setTimeout(function () {
        _this3.setState({
          duration: _this3.state.duration + 1
        });

        _this3.handleCounter();
      }, 1000);
    }
  };

  _proto.render = function render() {
    var _this4 = this;

    var state = this.state,
        props = this.props;
    return React.createElement(React.Fragment, null, React.createElement("hr", {
      style: {
        width: '100%'
      }
    }), React.createElement("div", null, props.session.remoteIdentity.uri.normal.user + " - " + props.session.remoteIdentity._displayName), React.createElement("br", null), React.createElement("div", null, statusMask(props.session.state)), React.createElement("br", null), this.props.session.state === sip_js.SessionState.Initial || this.props.session.state === sip_js.SessionState.Establishing ? null : React.createElement("div", null, getDurationDisplay(this.state.duration)), state.ended ? null : React.createElement(React.Fragment, null, React.createElement(Dialpad$1, {
      open: state.dialpadOpen,
      session: props.session
    }), React.createElement("div", {
      className: styles$2.actionsContainer
    }, props.phoneConfig.disabledButtons.includes('mute') ? null : React.createElement(Mute$1, {
      session: props.session
    }), React.createElement("button", {
      className: styles$2.endCallButton,
      disabled: state.ended,
      onClick: function onClick() {
        return _this4.endCall();
      }
    }, React.createElement("img", {
      src: declineIcon
    })), props.phoneConfig.disabledButtons.includes('hold') ? null : React.createElement(Hold$1, {
      session: props.session
    }), props.phoneConfig.disabledButtons.includes('numpad') ? null : React.createElement("div", {
      id: styles$2.actionButton,
      className: state.dialpadOpen ? styles$2.on : '',
      onClick: function onClick() {
        return _this4.setState({
          dialpadOpen: !state.dialpadOpen
        });
      }
    }, React.createElement("img", {
      src: dialpadIcon
    })), props.phoneConfig.disabledButtons.includes('transfer') ? null : React.createElement("div", {
      id: styles$2.actionButton,
      className: state.transferMenu ? styles$2.on : '',
      onClick: function onClick() {
        return _this4.setState({
          transferMenu: !state.transferMenu
        });
      }
    }, React.createElement("img", {
      src: transferIcon
    })), React.createElement("div", {
      id: styles$2.transferMenu,
      className: state.transferMenu ? '' : styles$2.closed
    }, React.createElement("input", {
      id: styles$2.transferInput,
      onChange: function onChange(e) {
        return _this4.setState({
          transferDialString: e.target.value
        });
      },
      placeholder: "Enter the transfer destination..."
    }), this.state.attendedTransferStarted ? null : React.createElement(BlindTranfer, {
      destination: state.transferDialString,
      session: props.session
    }), React.createElement(AttendedTransfer$1, {
      started: this.attendedProcess,
      destination: state.transferDialString,
      session: props.session
    }))), React.createElement("audio", {
      id: this.props.session.id,
      autoPlay: true
    })));
  };

  return Phone;
}(React.Component);

var mapStateToProps$7 = function mapStateToProps(state) {
  return {
    stateChanged: state.sipSessions.stateChanged,
    sessions: state.sipSessions.sessions,
    userAgent: state.sipAccounts.userAgent,
    deviceId: state.device.primaryAudioOutput
  };
};

var actions$7 = {
  endCall: endCall
};
var Phone$1 = reactRedux.connect(mapStateToProps$7, actions$7)(Phone);

var callIcon = require("./call-24px~AGZUevvA.svg");

var ring = require('./assets/ring.mp3');

var Incoming = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Incoming, _React$Component);

  function Incoming() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = Incoming.prototype;

  _proto.componentDidMount = function componentDidMount() {
    console.log('this is the session');
    console.log(this.props.session);
    toneManager.stopAll();
    toneManager.playRing('ringtone');
  };

  _proto.handleAccept = function handleAccept() {
    toneManager.stopAll();
    this.props.session.accept();
    this.props.acceptCall(this.props.session);
  };

  _proto.handleDecline = function handleDecline() {
    toneManager.stopAll();
    this.props.session.reject();
    this.props.declineCall(this.props.session);
  };

  _proto.render = function render() {
    var _this = this;

    var props = this.props;
    return React.createElement("div", {
      id: styles$2.incoming
    }, "Incoming: " + props.session.remoteIdentity.uri.normal.user + " - " + props.session.remoteIdentity._displayName, React.createElement("div", {
      className: styles$2.endCallButton,
      onClick: function onClick() {
        return _this.handleDecline();
      }
    }, React.createElement("img", {
      src: declineIcon
    })), React.createElement("div", {
      className: styles$2.startCallButton,
      onClick: function onClick() {
        return _this.handleAccept();
      }
    }, React.createElement("img", {
      src: callIcon
    })), React.createElement("audio", {
      id: 'ringtone',
      loop: true
    }, React.createElement("source", {
      src: ring,
      type: "audio/mpeg"
    })), React.createElement("audio", {
      id: this.props.session.id,
      autoPlay: true
    }));
  };

  return Incoming;
}(React.Component);

var mapStateToProps$8 = function mapStateToProps(state) {
  return {
    stateChanged: state.sipSessions.stateChanged
  };
};

var actions$8 = {
  acceptCall: acceptCall,
  declineCall: declineCall
};
var Incoming$1 = reactRedux.connect(mapStateToProps$8, actions$8)(Incoming);

var getSessions = function getSessions(sessions, phoneConfig, attendedTransfers) {
  var elements = [];

  for (var session in sessions) {
    if (attendedTransfers.includes(session)) continue;
    elements.push(React.createElement(Phone$1, {
      session: sessions[session],
      key: session,
      phoneConfig: phoneConfig
    }));
  }

  return elements;
};

var getIncomingCallReferrals = function getIncomingCallReferrals(sessions) {
  var elements = [];

  for (var session in sessions) {
    elements.push(React.createElement(Incoming$1, {
      session: sessions[session],
      key: session
    }));
  }

  return elements;
};

var PhoneSessions = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(PhoneSessions, _React$Component);

  function PhoneSessions() {
    return _React$Component.apply(this, arguments) || this;
  }

  var _proto = PhoneSessions.prototype;

  _proto.render = function render() {
    return React.createElement(React.Fragment, null, getIncomingCallReferrals(this.props.incomingCalls), getSessions(this.props.sessions, this.props.phoneConfig, this.props.attendedTransfers));
  };

  return PhoneSessions;
}(React.Component);

var mapStateToProps$9 = function mapStateToProps(state) {
  return {
    sessions: state.sipSessions.sessions,
    incomingCalls: state.sipSessions.incomingCalls,
    attendedTransfers: state.sipSessions.attendedTransfers
  };
};

var PS = reactRedux.connect(mapStateToProps$9)(PhoneSessions);

var styles$3 = {"container":"_Dialstring__container__2iAE_","dialButton":"_Dialstring__dialButton__3GsXr","dialInput":"_Dialstring__dialInput__32AFz","dialstringContainer":"_Dialstring__dialstringContainer__2sye_"};

var Dialstring = /*#__PURE__*/function (_React$Component) {
  _inheritsLoose(Dialstring, _React$Component);

  function Dialstring() {
    var _this;

    _this = _React$Component.apply(this, arguments) || this;
    _this.state = {
      currentDialString: ''
    };
    return _this;
  }

  var _proto = Dialstring.prototype;

  _proto.handleDial = function handleDial() {
    if (!this.checkDialstring()) {
      this.props.sipAccount.makeCall("" + this.state.currentDialString);
    }
  };

  _proto.checkDialstring = function checkDialstring() {
    return this.state.currentDialString.length === 0;
  };

  _proto.render = function render() {
    var _this2 = this;

    return React.createElement("div", {
      className: styles$3.dialstringContainer
    }, React.createElement("input", {
      className: styles$3.dialInput,
      onKeyPress: function onKeyPress(e) {
        if (e.key === 'Enter') {
          _this2.handleDial();

          e.preventDefault();
        }
      },
      placeholder: "Enter the number to dial...",
      onChange: function onChange(e) {
        return _this2.setState({
          currentDialString: e.target.value
        });
      }
    }), React.createElement("button", {
      className: styles$3.dialButton,
      disabled: this.checkDialstring(),
      onClick: function onClick() {
        return _this2.handleDial();
      }
    }, React.createElement("img", {
      src: callIcon
    })));
  };

  return Dialstring;
}(React.Component);

var mapStateToProps$a = function mapStateToProps(state) {
  return {
    sipAccount: state.sipAccounts.sipAccount
  };
};

var actions$9 = {};
var D = reactRedux.connect(mapStateToProps$a, actions$9)(Dialstring);

function symbolObservablePonyfill(root) {
	var result;
	var Symbol = root.Symbol;

	if (typeof Symbol === 'function') {
		if (Symbol.observable) {
			result = Symbol.observable;
		} else {
			result = Symbol('observable');
			Symbol.observable = result;
		}
	} else {
		result = '@@observable';
	}

	return result;
}

/* global window */

var root;

if (typeof self !== 'undefined') {
  root = self;
} else if (typeof window !== 'undefined') {
  root = window;
} else if (typeof global !== 'undefined') {
  root = global;
} else if (typeof module !== 'undefined') {
  root = module;
} else {
  root = Function('return this')();
}

var result = symbolObservablePonyfill(root);

/**
 * These are private action types reserved by Redux.
 * For any unknown actions, you must return the current state.
 * If the current state is undefined, you must return the initial state.
 * Do not reference these action types directly in your code.
 */
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split('').join('.');
};

var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false;
  var proto = obj;

  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

/**
 * Creates a Redux store that holds the state tree.
 * The only way to change the data in the store is to call `dispatch()` on it.
 *
 * There should only be a single store in your app. To specify how different
 * parts of the state tree respond to actions, you may combine several reducers
 * into a single reducer function by using `combineReducers`.
 *
 * @param {Function} reducer A function that returns the next state tree, given
 * the current state tree and the action to handle.
 *
 * @param {any} [preloadedState] The initial state. You may optionally specify it
 * to hydrate the state from the server in universal apps, or to restore a
 * previously serialized user session.
 * If you use `combineReducers` to produce the root reducer function, this must be
 * an object with the same shape as `combineReducers` keys.
 *
 * @param {Function} [enhancer] The store enhancer. You may optionally specify it
 * to enhance the store with third-party capabilities such as middleware,
 * time travel, persistence, etc. The only store enhancer that ships with Redux
 * is `applyMiddleware()`.
 *
 * @returns {Store} A Redux store that lets you read the state, dispatch actions
 * and subscribe to changes.
 */

function createStore(reducer, preloadedState, enhancer) {
  var _ref2;

  if (typeof preloadedState === 'function' && typeof enhancer === 'function' || typeof enhancer === 'function' && typeof arguments[3] === 'function') {
    throw new Error('It looks like you are passing several store enhancers to ' + 'createStore(). This is not supported. Instead, compose them ' + 'together to a single function.');
  }

  if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
    enhancer = preloadedState;
    preloadedState = undefined;
  }

  if (typeof enhancer !== 'undefined') {
    if (typeof enhancer !== 'function') {
      throw new Error('Expected the enhancer to be a function.');
    }

    return enhancer(createStore)(reducer, preloadedState);
  }

  if (typeof reducer !== 'function') {
    throw new Error('Expected the reducer to be a function.');
  }

  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  /**
   * This makes a shallow copy of currentListeners so we can use
   * nextListeners as a temporary list while dispatching.
   *
   * This prevents any bugs around consumers calling
   * subscribe/unsubscribe in the middle of a dispatch.
   */

  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  /**
   * Reads the state tree managed by the store.
   *
   * @returns {any} The current state tree of your application.
   */


  function getState() {
    if (isDispatching) {
      throw new Error('You may not call store.getState() while the reducer is executing. ' + 'The reducer has already received the state as an argument. ' + 'Pass it down from the top reducer instead of reading it from the store.');
    }

    return currentState;
  }
  /**
   * Adds a change listener. It will be called any time an action is dispatched,
   * and some part of the state tree may potentially have changed. You may then
   * call `getState()` to read the current state tree inside the callback.
   *
   * You may call `dispatch()` from a change listener, with the following
   * caveats:
   *
   * 1. The subscriptions are snapshotted just before every `dispatch()` call.
   * If you subscribe or unsubscribe while the listeners are being invoked, this
   * will not have any effect on the `dispatch()` that is currently in progress.
   * However, the next `dispatch()` call, whether nested or not, will use a more
   * recent snapshot of the subscription list.
   *
   * 2. The listener should not expect to see all state changes, as the state
   * might have been updated multiple times during a nested `dispatch()` before
   * the listener is called. It is, however, guaranteed that all subscribers
   * registered before the `dispatch()` started will be called with the latest
   * state by the time it exits.
   *
   * @param {Function} listener A callback to be invoked on every dispatch.
   * @returns {Function} A function to remove this change listener.
   */


  function subscribe(listener) {
    if (typeof listener !== 'function') {
      throw new Error('Expected the listener to be a function.');
    }

    if (isDispatching) {
      throw new Error('You may not call store.subscribe() while the reducer is executing. ' + 'If you would like to be notified after the store has been updated, subscribe from a ' + 'component and invoke store.getState() in the callback to access the latest state. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
    }

    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }

      if (isDispatching) {
        throw new Error('You may not unsubscribe from a store listener while the reducer is executing. ' + 'See https://redux.js.org/api-reference/store#subscribelistener for more details.');
      }

      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
      currentListeners = null;
    };
  }
  /**
   * Dispatches an action. It is the only way to trigger a state change.
   *
   * The `reducer` function, used to create the store, will be called with the
   * current state tree and the given `action`. Its return value will
   * be considered the **next** state of the tree, and the change listeners
   * will be notified.
   *
   * The base implementation only supports plain object actions. If you want to
   * dispatch a Promise, an Observable, a thunk, or something else, you need to
   * wrap your store creating function into the corresponding middleware. For
   * example, see the documentation for the `redux-thunk` package. Even the
   * middleware will eventually dispatch plain object actions using this method.
   *
   * @param {Object} action A plain object representing “what changed”. It is
   * a good idea to keep actions serializable so you can record and replay user
   * sessions, or use the time travelling `redux-devtools`. An action must have
   * a `type` property which may not be `undefined`. It is a good idea to use
   * string constants for action types.
   *
   * @returns {Object} For convenience, the same action object you dispatched.
   *
   * Note that, if you use a custom middleware, it may wrap `dispatch()` to
   * return something else (for example, a Promise you can await).
   */


  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error('Actions must be plain objects. ' + 'Use custom middleware for async actions.');
    }

    if (typeof action.type === 'undefined') {
      throw new Error('Actions may not have an undefined "type" property. ' + 'Have you misspelled a constant?');
    }

    if (isDispatching) {
      throw new Error('Reducers may not dispatch actions.');
    }

    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }

    var listeners = currentListeners = nextListeners;

    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }

    return action;
  }
  /**
   * Replaces the reducer currently used by the store to calculate the state.
   *
   * You might need this if your app implements code splitting and you want to
   * load some of the reducers dynamically. You might also need this if you
   * implement a hot reloading mechanism for Redux.
   *
   * @param {Function} nextReducer The reducer for the store to use instead.
   * @returns {void}
   */


  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== 'function') {
      throw new Error('Expected the nextReducer to be a function.');
    }

    currentReducer = nextReducer; // This action has a similiar effect to ActionTypes.INIT.
    // Any reducers that existed in both the new and old rootReducer
    // will receive the previous state. This effectively populates
    // the new state tree with any relevant data from the old one.

    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  /**
   * Interoperability point for observable/reactive libraries.
   * @returns {observable} A minimal observable of state changes.
   * For more information, see the observable proposal:
   * https://github.com/tc39/proposal-observable
   */


  function observable() {
    var _ref;

    var outerSubscribe = subscribe;
    return _ref = {
      /**
       * The minimal observable subscription method.
       * @param {Object} observer Any object that can be used as an observer.
       * The observer object should have a `next` method.
       * @returns {subscription} An object with an `unsubscribe` method that can
       * be used to unsubscribe the observable from the store, and prevent further
       * emission of values from the observable.
       */
      subscribe: function subscribe(observer) {
        if (typeof observer !== 'object' || observer === null) {
          throw new TypeError('Expected the observer to be an object.');
        }

        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }

        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[result] = function () {
      return this;
    }, _ref;
  } // When a store is created, an "INIT" action is dispatched so that every
  // reducer returns their initial state. This effectively populates
  // the initial state tree.


  dispatch({
    type: ActionTypes.INIT
  });
  return _ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[result] = observable, _ref2;
}

/**
 * Prints a warning in the console if it exists.
 *
 * @param {String} message The warning message.
 * @returns {void}
 */
function warning(message) {
  /* eslint-disable no-console */
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  /* eslint-enable no-console */


  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) {} // eslint-disable-line no-empty

}

function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || 'an action';
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}

function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? 'preloadedState argument passed to createStore' : 'previous state received by the reducer';

  if (reducerKeys.length === 0) {
    return 'Store does not have a valid reducer. Make sure the argument passed ' + 'to combineReducers is an object whose values are reducers.';
  }

  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join('", "') + "\"");
  }

  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;

  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? 'keys' : 'key') + " " + ("\"" + unexpectedKeys.join('", "') + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join('", "') + "\". Unexpected keys will be ignored.");
  }
}

function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });

    if (typeof initialState === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }

    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === 'undefined') {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
/**
 * Turns an object whose values are different reducer functions, into a single
 * reducer function. It will call every child reducer, and gather their results
 * into a single state object, whose keys correspond to the keys of the passed
 * reducer functions.
 *
 * @param {Object} reducers An object whose values correspond to different
 * reducer functions that need to be combined into one. One handy way to obtain
 * it is to use ES6 `import * as reducers` syntax. The reducers may never return
 * undefined for any action. Instead, they should return their initial state
 * if the state passed to them was undefined, and the current state for any
 * unrecognized action.
 *
 * @returns {Function} A reducer function that invokes every reducer inside the
 * passed object, and builds a state object with the same shape.
 */


function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};

  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];

    if (process.env.NODE_ENV !== 'production') {
      if (typeof reducers[key] === 'undefined') {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }

    if (typeof reducers[key] === 'function') {
      finalReducers[key] = reducers[key];
    }
  }

  var finalReducerKeys = Object.keys(finalReducers); // This is used to make sure we don't warn about the same
  // keys multiple times.

  var unexpectedKeyCache;

  if (process.env.NODE_ENV !== 'production') {
    unexpectedKeyCache = {};
  }

  var shapeAssertionError;

  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }

  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }

    if (shapeAssertionError) {
      throw shapeAssertionError;
    }

    if (process.env.NODE_ENV !== 'production') {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);

      if (warningMessage) {
        warning(warningMessage);
      }
    }

    var hasChanged = false;
    var nextState = {};

    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);

      if (typeof nextStateForKey === 'undefined') {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }

      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }

    hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
    return hasChanged ? nextState : state;
  };
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }

  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}

/**
 * Composes single-argument functions from right to left. The rightmost
 * function can take multiple arguments as it provides the signature for
 * the resulting composite function.
 *
 * @param {...Function} funcs The functions to compose.
 * @returns {Function} A function obtained by composing the argument functions
 * from right to left. For example, compose(f, g, h) is identical to doing
 * (...args) => f(g(h(...args))).
 */
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }

  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }

  if (funcs.length === 1) {
    return funcs[0];
  }

  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}

/**
 * Creates a store enhancer that applies middleware to the dispatch method
 * of the Redux store. This is handy for a variety of tasks, such as expressing
 * asynchronous actions in a concise manner, or logging every action payload.
 *
 * See `redux-thunk` package as an example of the Redux middleware.
 *
 * Because middleware is potentially asynchronous, this should be the first
 * store enhancer in the composition chain.
 *
 * Note that each middleware will be given the `dispatch` and `getState` functions
 * as named arguments.
 *
 * @param {...Function} middlewares The middleware chain to be applied.
 * @returns {Function} A store enhancer applying the middleware.
 */

function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }

  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);

      var _dispatch = function dispatch() {
        throw new Error('Dispatching while constructing your middleware is not allowed. ' + 'Other middleware would not be applied to this dispatch.');
      };

      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}

/*
 * This is a dummy function to check if the function name has been altered by minification.
 * If the function has been minified and NODE_ENV !== 'production', warn the user.
 */

function isCrushed() {}

if (process.env.NODE_ENV !== 'production' && typeof isCrushed.name === 'string' && isCrushed.name !== 'isCrushed') {
  warning('You are currently using minified code outside of NODE_ENV === "production". ' + 'This means that you are running a slower development build of Redux. ' + 'You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify ' + 'or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) ' + 'to ensure you have the correct code for your production build.');
}

var sipSessions = function sipSessions(state, action) {
  var _extends2, _extends3, _extends4, _extends5;

  if (state === void 0) {
    state = {
      sessions: {},
      incomingCalls: {},
      stateChanged: 0,
      onHold: [],
      attendedTransfers: []
    };
  }

  var type = action.type,
      payload = action.payload;

  switch (type) {
    case INCOMING_CALL:
      console.log('Incoming call');
      return _extends(_extends({}, state), {}, {
        incomingCalls: _extends(_extends({}, state.incomingCalls), {}, (_extends2 = {}, _extends2[payload.id] = payload, _extends2))
      });

    case NEW_SESSION:
      console.log('New session added');
      return _extends(_extends({}, state), {}, {
        sessions: _extends(_extends({}, state.sessions), {}, (_extends3 = {}, _extends3[payload.id] = payload, _extends3))
      });

    case NEW_ATTENDED_TRANSFER:
      return _extends(_extends({}, state), {}, {
        sessions: _extends(_extends({}, state.sessions), {}, (_extends4 = {}, _extends4[payload.id] = payload, _extends4)),
        attendedTransfers: [].concat(state.attendedTransfers, [payload.id])
      });

    case ACCEPT_CALL:
      var acceptedIncoming = _extends({}, state.incomingCalls);

      delete acceptedIncoming[payload.id];
      return _extends(_extends({}, state), {}, {
        incomingCalls: acceptedIncoming,
        sessions: _extends(_extends({}, state.sessions), {}, (_extends5 = {}, _extends5[payload.id] = payload, _extends5))
      });

    case DECLINE_CALL:
      var declinedIncoming = _extends({}, state.incomingCalls);

      delete declinedIncoming[payload.id];
      return _extends(_extends({}, state), {}, {
        incomingCalls: declinedIncoming
      });

    case SIPSESSION_STATECHANGE:
      return _extends(_extends({}, state), {}, {
        stateChanged: state.stateChanged + 1
      });

    case CLOSE_SESSION:
      var newIncoming = _extends({}, state.incomingCalls);

      var newSessions = _extends({}, state.sessions);

      delete newSessions[payload];
      delete newIncoming[payload];
      var endHold = [].concat(state.onHold).filter(function (session) {
        return session !== payload;
      });
      return _extends(_extends({}, state), {}, {
        sessions: newSessions,
        incomingCalls: newIncoming,
        onHold: endHold
      });

    case SIPSESSION_HOLD_REQUEST:
      return _extends(_extends({}, state), {}, {
        onHold: [].concat(state.onHold, [payload])
      });

    case SIPSESSION_UNHOLD_REQUEST:
      var newHold = [].concat(state.onHold).filter(function (session) {
        return session !== payload;
      });
      return _extends(_extends({}, state), {}, {
        onHold: newHold
      });

    default:
      return state;
  }
};

var sipAccounts = function sipAccounts(state, action) {
  if (state === void 0) {
    state = {
      sipAccount: null,
      userAgent: null,
      status: ''
    };
  }

  var type = action.type,
      payload = action.payload;

  switch (type) {
    case NEW_ACCOUNT:
      return _extends(_extends({}, state), {}, {
        sipAccount: action.payload
      });

    case NEW_USERAGENT:
      return _extends(_extends({}, state), {}, {
        userAgent: payload
      });

    default:
      return state;
  }
};

var device = function device(state, action) {
  if (state === void 0) {
    state = {
      audioInput: [],
      audioOutput: [],
      primaryAudioOutput: 'default',
      primaryAudioInput: 'default'
    };
  }

  var type = action.type,
      payload = action.payload;

  switch (type) {
    case AUDIO_INPUT_DEVICES_DETECTED:
      return _extends(_extends({}, state), {}, {
        audioInput: payload
      });

    case AUDIO_OUTPUT_DEVICES_DETECTED:
      return _extends(_extends({}, state), {}, {
        audioOutput: payload
      });

    case SET_PRIMARY_OUTPUT:
      return _extends(_extends({}, state), {}, {
        primaryAudioOutput: payload
      });

    case SET_PRIMARY_INPUT:
      return _extends(_extends({}, state), {}, {
        primaryAudioInput: payload
      });

    default:
      return state;
  }
};

var config = function config(state, action) {
  if (state === void 0) {
    state = {
      uri: '',
      password: '',
      phoneConfig: {}
    };
  }

  switch (action.type) {
    case SET_CONFIG:
      return _extends(_extends({}, state), {}, {
        phoneConfig: action.payload
      });

    case SET_CREDENTIALS:
      return _extends(_extends({}, state), {}, {
        uri: action.payload.uri,
        password: action.payload.password
      });

    default:
      return state;
  }
};

var reducers = combineReducers({
  sipAccounts: sipAccounts,
  sipSessions: sipSessions,
  device: device,
  config: config
});

var middleware = [thunk];
var persistConfig = {
  key: 'root',
  storage: storage,
  whitelist: ['device']
};
var persistedReducer = reduxPersist.persistReducer(persistConfig, reducers);
var defaultStore = createStore(persistedReducer, reduxDevtoolsExtension.composeWithDevTools(applyMiddleware.apply(void 0, middleware)));
var persistor = reduxPersist.persistStore(defaultStore);

var phoneStore = defaultStore;
var ReactSipPhone = function ReactSipPhone(_ref) {
  var name = _ref.name,
      _ref$width = _ref.width,
      width = _ref$width === void 0 ? 300 : _ref$width,
      _ref$height = _ref.height,
      height = _ref$height === void 0 ? 600 : _ref$height,
      _ref$phoneConfig = _ref.phoneConfig,
      phoneConfig = _ref$phoneConfig === void 0 ? {
    disabledButtons: []
  } : _ref$phoneConfig,
      sipConfig = _ref.sipConfig,
      sipCredentials = _ref.sipCredentials,
      _ref$containerStyle = _ref.containerStyle,
      containerStyle = _ref$containerStyle === void 0 ? {} : _ref$containerStyle;
  return React.createElement(reactRedux.Provider, {
    store: phoneStore
  }, React.createElement(react.PersistGate, {
    loading: null,
    persistor: persistor
  }, React.createElement(SipWrapper$1, {
    sipConfig: sipConfig,
    sipCredentials: sipCredentials,
    phoneConfig: phoneConfig
  }, React.createElement("div", {
    className: styles.container,
    style: _extends(_extends({}, containerStyle), {}, {
      width: (width < 300 ? 300 : width) + "px",
      height: (height < 600 ? 600 : height) + "px"
    })
  }, React.createElement(Status$1, {
    name: name
  }), React.createElement(D, null), React.createElement(PS, {
    phoneConfig: phoneConfig
  }), React.createElement("audio", {
    id: 'tone',
    autoPlay: true
  })))));
};

exports.ReactSipPhone = ReactSipPhone;
exports.phoneStore = phoneStore;
//# sourceMappingURL=index.js.map
