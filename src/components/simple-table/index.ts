export const paginationer = (pagination = {}) => {
  return {
    total: pagination.total || 0,
    position: 'bottom',
    current: pagination.current || 1,
    showSizeChanger: pagination.showSizeChanger !== undefined ? pagination.showSizeChanger : true,
    pageSizeOptions: pagination.pageSizeOptions || ['5', '10', '20', '50'],
    showLessItems: pagination.showLessItems !== undefined ? pagination.showLessItems : true,
    pageSize: pagination.pageSize || 10,
    'show-total': function (total, range) {
      return `共${total}条`
    }
  }
}