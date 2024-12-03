import Celebrity from "../../entity/celebrity";
import CelebrityTraining from "../../entity/celebrity_training";
export declare class CelebrityResponse extends Celebrity {
    training: CelebrityTraining | null;
}
