import * as moment from "moment";

export class ArticleSummary {
  id: string;
  creationUtcDate: moment.Moment;
  modificationUtcDate: moment.Moment;
  author: string;
  title: string;
  publicationUtcDate: moment.Moment;
  description: string;
}
