import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Input, Select, Button, Table, Divider } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
import { cutOffStr } from '../../utils/utils';
import { SorterOrderMapper, StatusArray, StatusMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './MessageTemplate.less';

@connect(({ MessageTemplateModel, loading }) => ({
  MessageTemplateModel,
  queryLoading: loading.effects['MessageTemplateModel/findByPage'],
}))
@Form.create()
export default class MessageTemplate extends PureComponent {

  // 数据初始化
  componentDidMount() {
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    dispatch({ type: 'MessageTemplateModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, MessageTemplateModel } = this.props;
    const queryParam = { ...MessageTemplateModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'MessageTemplateModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { form: { getFieldDecorator }, queryLoading, MessageTemplateModel: { queryParam } } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="模版名称">
            {getFieldDecorator('name', { initialValue: queryParam.name })(
              <Input placeholder="模版名称(模糊匹配)" />
            )}
          </Form.Item>
          <Form.Item label="模版内容">
            {getFieldDecorator('content', { initialValue: queryParam.content })(
              <Input placeholder="模版内容(模糊匹配)" />
            )}
          </Form.Item>
          <Form.Item label="启用模版">
            {getFieldDecorator('enabled', { initialValue: queryParam.enabled })(
              <Select placeholder="启用模版" allowClear={true}>
                {StatusArray.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item className={styles.formItemButton}>
            <Button type="primary" htmlType="submit" disabled={queryLoading}>查询</Button>
            <span className={styles.spanWidth16} />
            <Button>新增</Button>
          </Form.Item>
        </Row>
      </Form>
    );
  }

  getEnabledLabel = (val) => {
    let enabled = StatusMapper[`${val}`];
    if (!enabled) enabled = StatusMapper.error;
    return <span style={{ color: enabled.color }}>{enabled.label}</span>
  }

  // 数据表格
  getTable() {
    const { MessageTemplateModel, queryLoading } = this.props;
    const columns = [
      { title: '模版名称', dataIndex: 'name' },
      { title: '模版内容', dataIndex: 'content', render: val => cutOffStr(val, 100) },
      // { title: '模版示例', dataIndex: 'messageDemo' },
      { title: '启用模版', dataIndex: 'enabled', render: this.getEnabledLabel },
      // { title: '说明', dataIndex: 'description' },
      // { title: '创建时间', dataIndex: 'createAt' },
      // { title: '更新时间', dataIndex: 'updateAt' },
      {
        title: '操作', align: 'center', key: 'action',
        render: () => (
          <Fragment>
            <a>详情</a>
            <Divider type="vertical" />
            <a>编辑</a>
            <Divider type="vertical" />
            <a>删除</a>
          </Fragment>
        ),
      },
    ];
    return (
      <Table
        size="middle"
        bordered={true}
        rowKey={record => record.id}
        columns={columns}
        loading={queryLoading}
        dataSource={MessageTemplateModel.data}
        pagination={MessageTemplateModel.pagination}
        onChange={this.handleTableChange}
      />
    );
  }

  render() {
    return (
      <PageHeaderLayout>
        <Card bordered={false}>
          <div>
            {this.queryForm()}
          </div>
          {/* {this.actionButton()} */}
          {this.getTable()}
        </Card>
      </PageHeaderLayout>
    );
  }
}
