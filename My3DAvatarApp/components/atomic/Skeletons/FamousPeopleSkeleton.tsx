import { Skeleton } from "moti/skeleton";
import {
  ITEMS,
  SKELETON_COLORS,
} from "./FamousPeopleSkeleton.constants";
import { FamousPeopleSkeletonView } from "./FamousPeopleSkeleton.view";

export function FamousPeopleSkeleton() {
  return (
    <Skeleton.Group show>
      <FamousPeopleSkeletonView
        items={ITEMS}
        colors={SKELETON_COLORS}
      />
    </Skeleton.Group>
  );
}
