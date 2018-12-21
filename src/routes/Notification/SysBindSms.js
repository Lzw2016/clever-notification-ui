import React, { PureComponent } from 'react';
import { Card, Form, Row, Input, Select, Button, DatePicker } from 'antd';
import { connect } from 'dva';
import moment from 'moment';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
// import { LocaleLanguage, SystemInfo } from '../../utils/constant';
// import { changeLocale } from '../../utils/utils';
import { fmtDateTime } from '../../utils/fmt';
import { SorterOrderMapper, StatusArray, MessageTypeArray } from '../../utils/enum';
// import classNames from 'classnames';
import styles from './SysBindSms.less';

@connect(({ SysBindSmsModel, loading }) => ({
  SysBindSmsModel,
  queryLoading: loading.effects['global/queryPage'],
}))
@Form.create()
export default class SysBindSms extends PureComponent {

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
    dispatch({ type: 'SysBindSmsModel/findByPage', payload: { ...queryParam, pageNo: 0 } });
  }

  // 表格数据过滤或跳页
  handleTableChange = (pagination, _, sorter) => {
    const { dispatch, SysBindSmsModel } = this.props;
    const queryParam = { ...SysBindSmsModel.queryParam, pageNo: pagination.current, pageSize: pagination.pageSize };
    // 排序
    if (sorter.field) {
      const sorterMapper = {};
      queryParam.orderField = sorterMapper[sorter.field];
      queryParam.sort = SorterOrderMapper[sorter.order];
    } else {
      queryParam.orderField = undefined;
      queryParam.sort = undefined;
    }
    dispatch({ type: 'SysBindSmsModel/findByPage', payload: queryParam });
  }

  // 查询表单
  queryForm() {
    const { form: { getFieldDecorator }, queryLoading, SysBindSmsModel: { queryParam } } = this.props;
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
          <Form.Item label="系统启用">
            {getFieldDecorator('enabled', { initialValue: queryParam.enabled })(
              <Select placeholder="系统启用" allowClear={true}>
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
          </Form.Item>
        </Row>
      </Form>
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
          {/* {this.getTable()} */}
        </Card>
      </PageHeaderLayout>
    );
  }
}
