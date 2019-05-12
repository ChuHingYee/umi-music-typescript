import { GetProgramRecommend, GetRadioList } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface DJRadioState {
  recommendList: RecommendListType[];
  cateList: CateListType[];
  row1List: RowRadioType[];
  row2List: RowRadioType[];
  row3List: RowRadioType[];
  row4List: RowRadioType[];
  row5List: RowRadioType[];
  row6List: RowRadioType[];
}

type RecommendListType = {
  id: number;
  name: string;
  blurCoverUrl: string;
  dj: {
    nickname: string;
    userId: string;
  };
  category: string;
};

type CateListType = {
  id: number;
  name: string;
  pic: string;
};

type RowRadioType = {
  id: number;
  name: string;
  pic: string;
  rcmdtext: string;
};

const model: DvaModel<DJRadioState> = {
  namespace: 'djRadio',
  state: {
    recommendList: [],
    cateList: [],
    row1List: [],
    row2List: [],
    row3List: [],
    row4List: [],
    row5List: [],
    row6List: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getProgramRecommend(_, { put, call }) {
      const result = yield call(GetProgramRecommend, {});
      yield put({
        type: 'save',
        payload: {
          recommendList: result.programs.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              blurCoverUrl: item.blurCoverUrl,
              dj: {
                nickname: item.dj.nickname,
                userId: item.dj.userId,
              },
              category: item.radio.category,
            };
          }),
        },
      });
    },
    *getRadioRow1List(_, { put, call }) {
      const result = yield call(GetRadioList, {
        type: 2,
      });
      const data = result.djRadios.slice(0, 4);
      yield put({
        type: 'save',
        payload: {
          row1List: data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              pic: item.picUrl,
              rcmdtext: item.rcmdtext,
            };
          }),
        },
      });
    },
    *getRadioRow2List(_, { put, call }) {
      const result = yield call(GetRadioList, {
        type: 6,
      });
      const data = result.djRadios.slice(0, 4);

      yield put({
        type: 'save',
        payload: {
          row2List: data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              pic: item.picUrl,
              rcmdtext: item.rcmdtext,
            };
          }),
        },
      });
    },
    *getRadioRow3List(_, { put, call }) {
      const result = yield call(GetRadioList, {
        type: 5,
      });
      const data = result.djRadios.slice(0, 4);

      yield put({
        type: 'save',
        payload: {
          row3List: data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              pic: item.picUrl,
              rcmdtext: item.rcmdtext,
            };
          }),
        },
      });
    },
    *getRadioRow4List(_, { put, call }) {
      const result = yield call(GetRadioList, {
        type: 3,
      });
      const data = result.djRadios.slice(0, 4);

      yield put({
        type: 'save',
        payload: {
          row4List: data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              pic: item.picUrl,
              rcmdtext: item.rcmdtext,
            };
          }),
        },
      });
    },
    *getRadioRow5List(_, { put, call }) {
      const result = yield call(GetRadioList, {
        type: 2001,
      });
      const data = result.djRadios.slice(0, 4);

      yield put({
        type: 'save',
        payload: {
          row5List: data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              pic: item.picUrl,
              rcmdtext: item.rcmdtext,
            };
          }),
        },
      });
    },
    *getRadioRow6List(_, { put, call }) {
      const result = yield call(GetRadioList, {
        type: 11,
      });
      const data = result.djRadios.slice(0, 4);
      yield put({
        type: 'save',
        payload: {
          row6List: data.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              pic: item.picUrl,
              rcmdtext: item.rcmdtext,
            };
          }),
        },
      });
    },
  },
};

export default model;
