import {QuestionInterface} from "./QuestionInterface";
import _ from 'lodash';
import QuestionTypeEnum from "../../enums/QuestionTypeEnum";
import cards from '../../assets/actions.js';

export class ActionModel extends QuestionInterface {
    type = QuestionTypeEnum.ACTION;

    emoji = null;
    action = null;
    actionType = null;
    hasPlayer = false;

    constructor() {
        const card = _.sample(cards);

        super(card.title);

        this.setAction(card.desc);
        this.setEmoji(card.emoji);
        this.setActionType(card.type);

        if (card.has_player) {
            this.hasPlayer = true;
        }

        if (typeof card.desc === 'string' && card.desc.includes('%player_name%')) {
            this.hasPlayer = true;
        }
    }

    selectQuestion(playerData) {
        // if (this.hasPlayer) {
        this.setPlayerId(_.sample(playerData).name);
        // }
    }

    setAction(action) {
        this.action = action;
    }

    getAction() {
        return this.action;
    }

    setEmoji(emoji) {
        this.emoji = emoji;
    }

    getEmoji() {
        return this.emoji;
    }

    setActionType(type) {
        this.actionType = type;
    }

    getActionType() {
        return this.actionType;
    }
}
