export const handleMessageFromIframe = message => {};

export const setTenantInfo = tenantInfo => {
  return {
    type: 'SET_TENANT_INFO',
    tenantInfo,
  };
};
