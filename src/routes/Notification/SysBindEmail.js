import React, { PureComponent, Fragment } from 'react';
import { Card, Form, Row, Input, Select, Button, Table, Divider } from 'antd';
import { connect } from 'dva';
// import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { SorterOrderMapper, StatusArray, StatusMapper } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './SysBindEmail.less';

@connect(({ SysBindEmailModel, loading }) => ({
  SysBindEmailModel,
  queryLoading: loading.effects['global/queryPage'],
}))
@Form.create()
export default class SysBindEmail extends PureComponent {

  // 数据初始化
  componentDidMount() {
    this.findByPage();
  }

  // 查询数据
  findByPage = (e) => {
    if (e) e.preventDefault();
    const { dispatch, form } = this.props;
    const queryParam = form.getFieldsValue();
    dispatch({ type: 'SysBindEmailModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, SysBindEmailModel } = this.props;
    const queryParam = { ...SysBindEmailModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'SysBindEmailModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { form: { getFieldDecorator }, queryLoading, SysBindEmailModel: { queryParam } } = this.props;
    return (
      <Form onSubmit={this.findByPage} layout="inline" className={styles.queryForm}>
        <Row gutter={{ md: 0, lg: 0, xl: 0 }}>
          <Form.Item label="系统名字">
            {getFieldDecorator('sysName', { initialValue: queryParam.sysName })(
              <Input placeholder="系统名字" />
            )}
          </Form.Item>
          <Form.Item label="邮箱帐号">
            {getFieldDecorator('account', { initialValue: queryParam.account })(
              <Input placeholder="邮箱帐号(模糊匹配)" />
            )}
          </Form.Item>
          <Form.Item label="发送人姓名">
            {getFieldDecorator('fromName', { initialValue: queryParam.fromName })(
              <Input placeholder="发送人姓名(模糊匹配)" />
            )}
          </Form.Item>
          <Form.Item label="是否启用">
            {getFieldDecorator('enabled', { initialValue: queryParam.enabled })(
              <Select placeholder="是否启用" allowClear={true}>
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
    const { SysBindEmailModel, queryLoading } = this.props;
    const columns = [
      { title: '系统名称', dataIndex: 'sysName' },
      { title: '邮箱帐号', dataIndex: 'account' },
      { title: '发送人姓名', dataIndex: 'fromName' },
      { title: 'SMTP Host', dataIndex: 'smtpHost' },
      { title: 'POP3 Host', dataIndex: 'pop3Host' },
      { title: '启用', dataIndex: 'enabled', render: this.getEnabledLabel },
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
        dataSource={SysBindEmailModel.data}
        pagination={SysBindEmailModel.pagination}
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
