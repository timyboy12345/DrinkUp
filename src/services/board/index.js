import CardTypeEnum from "@/enums/CardTypeEnum";
import {RuleCard} from "@/models/Board/RuleCard";
import {TruthOrDareCard} from "@/models/Board/TruthOrDareCard";
import {DrinkCard} from "@/models/Board/DrinkCard";
import {SurpriseCard} from "@/models/Board/SurpriseCard";
import {ChallengeCard} from "@/models/Board/ChallengeCard";
import {MiniGameCard} from "@/models/Board/MiniGameCard";

export default {
    generateCard(type) {
        switch (type) {
            case CardTypeEnum.RULE:
                return new RuleCard();
            case CardTypeEnum.TRUTH_OR_DARE:
                return new TruthOrDareCard();
            case CardTypeEnum.SURPRISE:
                return new SurpriseCard();
            case CardTypeEnum.CHALLENGE:
                return new ChallengeCard();
            case CardTypeEnum.MINI_GAME:
                return new MiniGameCard();
            case CardTypeEnum.DRINK:
                return new DrinkCard();
            default:
                console.warn(`${type} card type not found, falling back on drink`);
                return new DrinkCard();
        }
    },
    roll() {
        // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        const max = 7;
        const min = 1;
        const minCeil = Math.ceil(min);
        const maxFloored = Math.floor(max);

        // The maximum is exclusive and the minimum is inclusive
        return Math.floor(Math.random() * (maxFloored - minCeil) + minCeil);
    }
}
