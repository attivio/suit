// @flow

/**
 *  A query placement from a Business Center profile/campaign.
 */
export default class Placement {
  constructor(label: string, linkUrl: string | null, linkText: string | null, imageUrl: string | null, markup: string | null) {
    this.label = label;
    this.linkUrl = linkUrl;
    this.linkText = linkText;
    this.imageUrl = imageUrl;
    this.markup = markup;
  }

  /**
   * The descriptive label for this placement.
   * This label is used for placement purposes and will typically have a value
   * of "top", "left", etc.
   */
  label: string;
  /** The address of the link. Optional. */
  linkUrl: string | null;
  /** The text to display as the link. Optional. */
  linkText: string | null;
  /** The address of an image to display. Optional. */
  imageUrl: string | null;
  /** The raw html markup to display. Optional. */
  markup: string | null;
}
