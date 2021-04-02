import { MailPreview } from "./MailPreview.jsx";

export function MailList({ mails, onRemoveMail, onStarMail, onReadMail, onToggleReadMail, openInCompose, currLabel, currFilter }) {

    function getCurrFilter() {
        let filter
        switch (currFilter) {
            case 'read':
                filter = 'Read'
                break;
            case 'unread':
                filter = 'Unread'
                break;
            default:
                filter = ''
                break;
        }
        return filter
    }
    function getCurrLabel() {
        let label
        switch (currLabel) {
            case 'isInbox':
                label = 'Messages in Inbox'
                break;
            case 'isStarred':
                label = 'Starred Messages'
                break;
            case 'isSent':
                label = 'Sent Messages'
                break;
            case 'isDraft':
                label = 'Messages to Edit'
                break;
            case 'isTrash':
                label = 'Messages in Trash'
                break;
            default:
                label = 'Messages'
                break;
        }
        return label
    }

    if (mails.length === 0) return <div className="no-mail-msg"><h2>You Have No {getCurrFilter()} {getCurrLabel()}...</h2></div>
    return (
        <ul className="mail-list">
            
            {mails.map((mail) => {
                return (
                    <li className="mail-item-container" key={mail.id}>
                        <MailPreview
                            mail={mail}
                            onRemoveMail={onRemoveMail}
                            onStarMail={onStarMail}
                            onReadMail={onReadMail}
                            onToggleReadMail={onToggleReadMail}
                            openInCompose={openInCompose}
                        />
                    </li>
                );
            })}
        </ul>
    );
}
