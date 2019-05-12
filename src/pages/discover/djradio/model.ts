import { GetRadioCateList } from './service';
import { DvaModel } from '@/interfaces/dva';

export interface RadioState {
  cateList: CateListType[];
}

type CateListType = {
  id: number;
  name: string;
  pic: string;
};

const model: DvaModel<RadioState> = {
  namespace: 'djRadioLayout',
  state: {
    cateList: [],
  },
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  effects: {
    *getRadioCateList(_, { put, call }) {
      const result = yield call(GetRadioCateList, {});
      yield put({
        type: 'save',
        payload: {
          cateList: result.categories.map((item: any) => {
            return {
              id: item.id,
              name: item.name,
              pic: item.picWebUrl,
            };
          }),
        },
      });
    },
  },
};

export default model;
