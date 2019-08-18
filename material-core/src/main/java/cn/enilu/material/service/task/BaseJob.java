package cn.enilu.material.service.task;

import cn.enilu.material.bean.vo.QuartzJob;
import org.quartz.Job;
import org.quartz.JobDataMap;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;
import org.springframework.stereotype.Component;

@Component
public class BaseJob implements Job {

	@Override
	public void execute(JobExecutionContext context) throws JobExecutionException {
		JobDataMap data = context.getJobDetail().getJobDataMap();
		QuartzJob job = (QuartzJob) data.get("job");
		try {
			TaskUtils.executeJob(job);
		} catch (Exception e) {
			throw new JobExecutionException(e);
		}
	}
}
