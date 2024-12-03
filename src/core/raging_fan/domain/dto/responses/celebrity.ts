import Celebrity from "../../entity/celebrity";
import CelebrityTraining from "../../entity/celebrity_training";

export class CelebrityResponse extends Celebrity{
    training: CelebrityTraining | null ;
}