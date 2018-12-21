import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Input, Select, Button, DatePicker, Table, Divider } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { fmtDateTime } from '../../utils/fmt';
import { SorterOrderMapper, StatusArray, MessageTypeArray, StatusMapper, MessageTypeMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './FrequencyLimit.less';

@connect(({ FrequencyLimitModel, loading }) => ({
  FrequencyLimitModel,
  queryLoading: loading.effects['global/queryPage'],
}))
@Form.create()
export default class FrequencyLimit extends PureComponent {

  // 数据初始化
  componentDidMount() {
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    if (queryParam.expiredTimeStart) {
      queryParam.expiredTimeStart = fmtDateTime(queryParam.expiredTimeStart, "YYYY-MM-DD 00:00:00");
    }
    if (queryParam.expiredTimeEnd) {
      queryParam.expiredTimeEnd = fmtDateTime(queryParam.expiredTimeEnd, "YYYY-MM-DD 23:59:59");
    }
    dispatch({ type: 'FrequencyLimitModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, FrequencyLimitModel } = this.props;
    const queryParam = { ...FrequencyLimitModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'FrequencyLimitModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { form: { getFieldDecorator }, queryLoading, FrequencyLimitModel: { queryParam } } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="系统名字">
            {getFieldDecorator('sysName', { initialValue: queryParam.sysName })(
              <Input placeholder="系统名字" />
            )}
          </Form.Item>
          <Form.Item label="黑名单帐号">
            {getFieldDecorator('account', { initialValue: queryParam.account })(
              <Input placeholder="黑名单帐号" />
            )}
          </Form.Item>
          <Form.Item label="消息类型">
            {getFieldDecorator('messageType', { initialValue: queryParam.messageType })(
              <Select placeholder="消息类型" allowClear={true}>
                {MessageTypeArray.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
          <Form.Item label="是否启用">
            {getFieldDecorator('enabled', { initialValue: queryParam.enabled })(
              <Select placeholder="是否启用" allowClear={true}>
                {StatusArray.map(item => (<Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>))}
              </Select>
            )}
          </Form.Item>
        </Row>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="过期时间">
            {getFieldDecorator('expiredTimeStart', { initialValue: queryParam.expiredTimeStart ? moment(queryParam.expiredTimeStart) : undefined })(
              <DatePicker placeholder="过期时间-开始" style={{ width: 174 }} />
            )}
          </Form.Item>
          <Form.Item label="过期时间">
            {getFieldDecorator('expiredTimeEnd', { initialValue: queryParam.expiredTimeEnd ? moment(queryParam.expiredTimeEnd) : undefined })(
              <DatePicker placeholder="过期时间-结束" style={{ width: 174 }} />
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

  getLimit = (count) => {
    if (!count || count <= 0) return <span style={{ color: '#faad14' }}>无限制</span>;
    return <span style={{ color: '#52c41a' }}>{count}</span>;
  }

  // 数据表格
  getTable() {
    const { FrequencyLimitModel, queryLoading } = this.props;
    const columns = [
      { title: '系统名称', dataIndex: 'sysName' },
      {
        title: '消息类型', dataIndex: 'messageType', render: val => {
          let messageType = MessageTypeMapper[`${val}`];
          if (!messageType) messageType = MessageTypeMapper.error;
          return <span>{messageType.label}</span>
        },
      },
      { title: '限速帐号', dataIndex: 'account' },
      { title: '是否启用', dataIndex: 'enabled', render: this.getEnabledLabel },
      { title: '过期时间', dataIndex: 'expiredTime' },
      { title: '每分钟发送次数限制', dataIndex: 'minutesCount', render: this.getLimit },
      { title: '每小时发送次数限制', dataIndex: 'hoursCount', render: this.getLimit },
      { title: '每天发送次数限制', dataIndex: 'daysCount', render: this.getLimit },
      { title: '每周发送次数限制', dataIndex: 'weeksCount', render: this.getLimit },
      { title: '每月发送次数限制', dataIndex: 'monthsCount', render: this.getLimit },
      // { title: '创建时间', dataIndex: 'createAt' },
      // { title: '更新时间', dataIndex: 'updateAt' },
      {
        title: '操作', align: 'center', key: 'action',
        render: () => (
          <Fragment>
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
        dataSource={FrequencyLimitModel.data}
        pagination={FrequencyLimitModel.pagination}
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
