const { Link } = ReactRouterDOM;
import {utilService} from '../../../services/utilService.js'
import { mailService } from '../services/mail-service.js';

export function MailPreview({ mail, onRemoveMail, onStarMail, onReadMail, openInCompose, onToggleReadMail }) {
    function getReadStatus() {
        return mail.isRead ? "" : "-open";
    }
    function getStarredStatus() {
        return mail.isStarred ? "starred" : "";
    }
    function getTime() {
        if (
            new Date().toLocaleDateString() === mail.sentAt.toLocaleDateString()
        )
            return mail.sentAt.toLocaleTimeString().replace(/:\d+ /, " ");
        var str = mail.sentAt.toLocaleDateString()
        return str.substring(0,str.length-2)
    }

    return (
        <div className={`mail-preview-container not${getReadStatus()}`}>
            <div className={`float-icons not${getReadStatus()}`}>
                <i
                    className="fa fa-trash-o md"
                    onClick={() => {
                        onRemoveMail(mail.id);
                    }}
                ></i>
                <i
                    className={`fa fa-envelope${getReadStatus()} md`}
                    onClick={() => {
                        onToggleReadMail(mail.id);
                    }}
                ></i>
            </div>
            {!mail.isTrash && (
                <i
                    className={`fa fa-star mail-icon md ${getStarredStatus()}`}
                    onClick={() => {
                        onStarMail(mail.id);
                    }}
                ></i>
            )}
            {mail.isTrash && <i className="fa fa-trash-o mail-icon md red"></i> }
            
            <Link to={`/mail/${mail.id}`} onClick={() => {
                if (!mail.isDraft) onReadMail(mail.id)
                else openInCompose(mail)
                }} className={`mail-preview-details ${getReadStatus()}`}>
                    <div className="preview-sender">
                        <span className="sender-icon" style={{backgroundColor: `${mailService.getBgColor(mail)}`}}>
                            {utilService.getInitials(mail.sender)}
                        </span>
                        <span>
                            {mail.sender}{" "}
                            {mail.sendTo && !mail.isDraft && (
                                <span className="font-regular">
                                    To: {mail.sendTo}
                                </span>
                            )}
                            {mail.isDraft && <span className="red">Draft</span>}
                        </span>
                    </div>
                    <div className="preview-main">
                        <span className="preview-subject">{mail.subject}</span>
                        <span> - </span>
                        <span className="preview-body">{mail.body}</span>
                    </div>
                    <div className="preview-mail-sent">
                        <span>{getTime()}</span>
                    </div>
            </Link>
            
        </div>
    );
}
