import { apiCreator } from 'src/common/service/api-creator';

const apis = {
  getEntityList: {
    api: '/api/cdp/model',
  },
};

export const getEntityList = apiCreator<(params: IPagingRequest & { query?: string }) => IPagingData<Entity.Entity>>(
  apis.getEntityList,
);
