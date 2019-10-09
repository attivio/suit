// @flow

import ObjectUtils from '../../src/util/ObjectUtils';

const entityColorsObj = {
  location: '#007dbc',
  company: '#ed7a23',
  people: '#fedd0e',
  product: '#db2e75',
  religion: '#ef8baa',
  jobtitle: '#fcb62c',
  phonenum: '#c32026',
  email: '#a04ba0',
  url: '#767676',
  utm: '#e6e6e6',
  time: '#934900',
  extracteddate: '#d3cba9',
  keyphrase: '#037f70',
  hashtags: '#0caa93',
  mentions: '#38e5cc',
  creditcard: '#1b7735',
  money: '#6fbe44',
  nationality: '#77d5f3',
  distance: '#075484',
  coordinate: '#caeefa',
};

const entityColorsMap = ObjectUtils.toMap(entityColorsObj);

export default entityColorsMap;
