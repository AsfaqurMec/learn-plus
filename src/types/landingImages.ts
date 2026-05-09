export type BeforeAfterImagePair = {
  before: string;
  after: string;
};

export type ForWhomItem = {
  image: string;
  title: string;
};

export type LandingImagesPayload = {
  banner: string;
  parentPainPoints: string[];
  ourSolution: string;
  beforeAfter: BeforeAfterImagePair[];
  studentBenefit: string;
  forWhom: ForWhomItem[];
  testimonial: string;
  limitedTimeOffer: string;
  program: string;
};
