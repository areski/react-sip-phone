import * as React from 'react';
import { Session, UserAgent } from 'sip.js';
interface Props {
    session: Session;
    userAgent: UserAgent;
    destination: string;
    blindTransferRequest: Function;
    blindTransferSuccess: Function;
    blindTransferFail: Function;
}
declare class BlindTransfer extends React.Component<Props> {
    blindTransferCall(): void;
    render(): JSX.Element;
}
declare const _default: import("react-redux").ConnectedComponent<typeof BlindTransfer, Pick<React.ClassAttributes<BlindTransfer> & Props, "session" | "destination" | "ref" | "key">>;
export default _default;