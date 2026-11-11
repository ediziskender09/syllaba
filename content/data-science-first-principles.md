---
slug: data-science-first-principles
title: "Data Science from First Principles: Think Clearly Before You Model"
summary: "A practical course—with interactive quizzes that explain wrong answers—on questions, data quality, measurement, uncertainty, modeling, validation, and communication."
category: "Data"
type: course
level: beginner
tier: deep
price: 6
minutes: 160
tags: [data-science, analytics, statistics, machine-learning, data-literacy]
featured: false
publishedAt: "2026-03-05"
---

## Learning Outcomes

By the end of this lesson, you will understand data science as a disciplined way to learn from evidence, not as a collection of mysterious algorithms. You will be able to frame a data question, identify the unit of analysis, inspect data quality, distinguish correlation from causation, reason about uncertainty, understand the basic workflow of predictive modeling, evaluate model performance, and communicate results responsibly.

This course is for beginners who want the foundations before the tools. You do not need Python, R, SQL, or advanced mathematics to benefit from it. Tools are useful, but they are not the essence of data science. The essence is asking a precise question, connecting that question to relevant data, using appropriate methods, checking whether the result is trustworthy, and explaining what decision should change.

## What Data Science Is

Data science is the practice of using data to answer questions, support decisions, and build systems that learn from patterns. It combines domain knowledge, statistics, computation, and communication. A data scientist might estimate whether a marketing campaign increased signups, predict which customers are likely to cancel, detect unusual transactions, recommend products, or measure whether a product change improved retention.

The word "science" matters. Science is not a guarantee of certainty. It is a method for reducing uncertainty. Good data science starts with doubt. What exactly are we trying to know? What would count as evidence? What could mislead us? What assumptions are we making? How might this result fail when used in the real world?

Many beginners think data science begins with a dataset. In professional work, it usually begins with a decision. A company may ask, "Which customers should receive a retention offer?" That decision leads to questions: Who is at risk of leaving? What does "leaving" mean? What data is available before the offer is sent? What action will be taken if the model predicts risk? How will success be measured? Only then does the dataset become meaningful.

## Start with the Decision

A weak data question is vague: "Analyze customer behavior." A stronger question is tied to a decision: "Which active customers should the retention team contact this week to reduce cancellations?" The stronger question defines a population, a time frame, an outcome, and an action.

Before doing analysis, write a short decision statement:

```text
We need to decide which customers should receive a retention call next week.
The action is limited to 1,000 calls.
The outcome we want to reduce is cancellation within 30 days.
We can only use information available before the call list is created.
```

This statement prevents common mistakes. If you use data from after the call date, the model may look accurate but be impossible to use. If you predict lifetime cancellation without a time frame, the business cannot act. If you rank every customer but the team can only call 1,000, the useful output is not a perfect prediction for all customers; it is a prioritized list.

Good framing turns data science from "find interesting patterns" into "produce evidence for a decision."

## The Unit of Analysis

The unit of analysis is what one row represents in your analytical dataset. It might be one customer, one order, one website session, one product, one patient visit, or one school per year. Confusion about the unit of analysis causes many errors.

If the question is "Which customers are likely to cancel?" one row should probably represent one customer at a specific point in time. If the question is "Which orders are likely to be returned?" one row should represent one order. If the question is "Which marketing channels produce high-value customers?" one row might represent a customer acquisition event, later joined to customer value.

Imagine you have customer records and order records. Customers can place many orders. If you join these tables without thinking, you may create multiple rows per customer. That is fine for order-level analysis, but wrong for customer-level prediction unless you aggregate order behavior first. For example, a customer-level table might include `orders_last_30_days`, `total_spend_last_90_days`, and `days_since_last_order` rather than one row per order.

Whenever you start a project, complete this sentence: "Each row in my analysis represents one ___ at ___." The second blank is often a time point. Predictive problems especially need time. A row might represent one customer as of Monday morning, using data available before Monday, with an outcome observed over the following 30 days.

## Measurement: Turning Reality into Data

Data is not reality. Data is a measurement of reality through systems, rules, and human choices. A purchase table measures purchases that were recorded successfully. A support ticket table measures issues that customers chose to report through tracked channels. A satisfaction score measures responses from people who answered a survey, not necessarily all customers.

Every column has a measurement story. `Revenue` might mean booked revenue, collected cash, net revenue after refunds, or gross order value before discounts. `Active user` might mean logged in, opened the app, performed a meaningful action, or paid this month. `Churn` might mean cancellation, non-renewal, inactivity, or account deletion.

Before analyzing, define key measures. If two stakeholders disagree about revenue, resolve that before building charts. If a model is trained on a poorly defined outcome, it may optimize the wrong thing. A churn model trained on "no login for 30 days" will behave differently from one trained on "subscription canceled."

Good measurement work includes checking missingness, ranges, duplicates, and consistency. Are there negative ages? Future signup dates? Orders with zero total? Customers with multiple IDs? Products assigned to retired categories? These are not boring cleanup tasks. They determine whether conclusions are credible.

## Exploratory Data Analysis

Exploratory data analysis, or EDA, is the process of understanding data before making strong claims. It answers practical questions: How many rows are there? What columns exist? What does each row represent? Which values are missing? What are the typical and extreme values? How are key variables distributed? Do categories match expectations?

Start with simple summaries. For numeric columns, inspect minimum, maximum, average, median, and percentiles. For categorical columns, count the most common values. For dates, check the earliest and latest records and whether there are gaps. For IDs, check uniqueness.

Visualization helps because patterns are easier to see than read. A histogram shows distribution. A line chart shows change over time. A scatter plot shows relationships between two numeric variables. A bar chart compares categories. The purpose is not decoration; it is diagnosis.

EDA should produce questions, not just answers. If revenue spikes on one day, was there a promotion, a tracking bug, or a large enterprise order? If one region has unusually high returns, is the product mix different? If missing values appear mostly before a certain date, did the tracking system change? Data science improves when analysis and domain knowledge interact.

<!-- quiz:data-checkpoint-1 -->

## Correlation, Causation, and Confounding

Correlation means two things move together. Causation means one thing produces a change in another. Data science often starts by finding correlations, but decisions usually require causal thinking.

Suppose customers who use a mobile app feature have higher retention. Does the feature cause retention? Maybe. But it may also be that already loyal customers explore more features. The feature and retention are correlated, but loyalty, engagement, or customer segment could be confounding factors. A confounder is a variable related to both the possible cause and the outcome.

The safest way to estimate causation is a randomized experiment. If customers are randomly assigned to see or not see a feature, the groups should be similar on average except for the feature exposure. Then a difference in retention is more plausibly caused by the feature. Randomization is powerful because it reduces hidden bias.

When experiments are not possible, observational analysis can still be useful, but the claims must be more careful. You can compare similar groups, control for known differences, use before-and-after designs, or examine natural experiments. Still, you should avoid saying "caused" when the evidence only supports "associated with."

## Uncertainty and Sampling

Data science rarely observes everything perfectly. A survey samples some customers. An A/B test observes a limited period. A model is trained on historical examples. Results vary because of randomness, measurement error, and changes in the world.

Uncertainty is not a weakness; it is part of honest analysis. If a campaign conversion rate is 5.2% in one sample and 5.6% in another, the difference may be noise. If a test group has 10 purchases and a control group has 8, the test may not be large enough to support a strong conclusion. Bigger samples usually reduce random uncertainty, but they do not fix biased measurement.

Think in intervals, not just point estimates. Saying "conversion increased by 0.4 percentage points" is less useful than saying "conversion appears to have increased by about 0.4 percentage points, but the plausible range includes very small effects." For beginners, the key idea is that numbers from data have precision limits.

Uncertainty also affects prediction. A model score is not destiny. A customer with 80% predicted churn risk may stay, and a customer with 5% predicted risk may cancel. Predictions are statements about likelihood based on patterns, not guarantees about individual outcomes.

## Predictive Modeling from First Principles

A predictive model uses known examples to estimate an unknown outcome. In supervised learning, each training example has features and a label. Features are the inputs available at prediction time. The label is the outcome you want to predict.

For a churn model, features might include days since last login, number of support tickets, plan type, payment failures, and usage in the last 30 days. The label might be whether the customer canceled within the next 30 days. The model learns patterns connecting features to the label.

The basic workflow is:

1. Define the prediction target.
2. Define the prediction time.
3. Build features using only data available before that time.
4. Split data into training and testing sets.
5. Train the model on the training set.
6. Evaluate performance on the testing set.
7. Decide how predictions will be used.

The split between training and testing is essential. If you evaluate a model on the same data it learned from, it may appear better than it really is. The real question is how well it performs on new cases. This is why time-based splits are often useful in business settings: train on earlier months and test on later months.

## Worked Example: Churn Risk

Imagine a subscription business wants to identify customers likely to cancel in the next 30 days. The retention team can contact 500 customers per week. The data includes account age, plan type, last login date, number of logins in the last 30 days, support tickets, failed payments, and cancellation status.

First, define the row. Each row represents one active customer as of a weekly scoring date. The label is whether the customer cancels within 30 days after that scoring date. This prevents using future information accidentally.

Second, create features. `days_since_last_login` measures recency. `logins_last_30_days` measures engagement. `support_tickets_last_30_days` may indicate frustration. `failed_payments_last_30_days` may indicate billing risk. `account_age_days` captures lifecycle stage. These features are understandable, available before scoring, and connected to plausible churn behavior.

Third, split the data. Use older scoring dates for training and newer scoring dates for testing. This better simulates future use than a random split when behavior changes over time.

Fourth, evaluate the model in business terms. Overall accuracy may be misleading if only 5% of customers cancel. A model that predicts "no churn" for everyone is 95% accurate but useless. Because the team can call only 500 customers, measure how many actual churners appear in the top 500 scores. This is often called precision at a cutoff or lift in the top segment.

Finally, decide the action. A high-risk customer may receive a call, discount, onboarding help, or product education. The model is only valuable if the action improves outcomes enough to justify the cost and potential side effects.

## Model Evaluation

Evaluation depends on the problem. For regression, where the model predicts a number, common metrics include mean absolute error and root mean squared error. If you predict delivery time, you might ask how many minutes off the predictions are on average.

For classification, where the model predicts a category or probability, common ideas include accuracy, precision, recall, and the confusion matrix. Accuracy is the share of predictions that are correct. Precision asks, "When the model predicts positive, how often is it right?" Recall asks, "Of all actual positives, how many did the model find?"

Consider a fraud detection system. If it flags too many legitimate transactions, customers are frustrated. If it misses fraud, the company loses money. Precision and recall trade off. A stricter threshold may improve precision but reduce recall. A looser threshold may catch more fraud but create more false alarms.

Evaluation should match the decision. If a sales team can call 100 leads, ranking quality at the top matters more than average performance across all leads. If a medical screening tool must avoid missing dangerous cases, recall may matter more. If false accusations are costly, precision may matter more.

## Overfitting and Generalization

Overfitting happens when a model learns noise or quirks in the training data instead of patterns that generalize. An overfit model performs well on training data but poorly on new data. It is like memorizing practice questions instead of understanding the subject.

Overfitting can occur with complex models, too many features, data leakage, or repeated experimentation until something looks good by chance. Simpler models are not automatically better, but they are often easier to inspect and harder to misuse. A good beginner habit is to build a simple baseline first. If a complex model does not clearly beat the baseline on new data, it may not be worth the complexity.

Generalization is the ability to perform well on data not used for training. Testing on future data is one way to estimate it. Monitoring after deployment is another. A model that worked last year may degrade if customer behavior, product pricing, marketing channels, or economic conditions change.

<!-- quiz:data-checkpoint-2 -->

## Data Leakage

Data leakage occurs when information unavailable at prediction time sneaks into the model. It is one of the most damaging data science mistakes because it makes performance look excellent during testing and poor in real use.

In churn prediction, a feature such as `cancellation_reason` is leakage because it is known only after cancellation. A feature such as `refund_requested_next_30_days` is also leakage because it uses future information. Even subtle fields can leak, such as account status codes updated during the cancellation process.

To prevent leakage, draw a timeline. Mark the prediction time, the feature observation window, and the outcome window. Features must come before the prediction time. Labels must come after. Any field created after the prediction time should be excluded unless it would truly be available in production.

## Communication and Decision Support

A technically correct analysis can fail if it is poorly communicated. Stakeholders need to know what was asked, what data was used, what method was applied, what was found, how confident they should be, and what action is recommended.

A strong data science summary is concise:

```text
Question: Which customers should receive retention calls next week?
Data: Active subscription customers scored weekly from January to June 2026.
Method: Churn model trained on historical behavior available before each scoring date.
Result: The top 500 scored customers contain about 3.2 times as many future churners as a random 500-customer list.
Recommendation: Pilot retention calls on the top 500 list for four weeks and measure cancellation rate against a control group.
Limitations: The model has not yet been tested under an actual intervention, and high-risk customers may be harder to save.
```

Notice that the recommendation includes a pilot and a control group. Prediction alone does not prove that the action works. A model can identify risk, but the business still needs to test whether intervention changes the outcome.

## Exercises

### Exercise 1: Frame the Question

Rewrite this vague request as a decision-focused data science question: "Analyze our sales data."

### Exercise 2: Identify the Unit of Analysis

For a model predicting whether an order will be returned, what should one row represent?

### Exercise 3: Spot Leakage

A churn model includes a feature called `days_until_cancellation`. Explain why this is a problem.

### Exercise 4: Choose an Evaluation Metric

A support team can proactively contact only 200 customers per week. They want to find customers most likely to submit urgent tickets. What kind of evaluation should matter?

### Exercise 5: Correlation or Causation

Customers who attend webinars have higher renewal rates. What alternative explanation should you consider before claiming webinars cause renewals?

## Answers

### Answer 1

A stronger version is: "Which product categories should receive additional advertising budget next month to increase gross margin, based on sales and margin performance over the last six months?" This version defines an action, time frame, outcome, and basis for comparison.

### Answer 2

One row should represent one order at a defined point before the return outcome is known. Features should describe the order, customer, product, shipping, and other information available before or at fulfillment, not after the return decision.

### Answer 3

`days_until_cancellation` is leakage because it uses future information. At the time you are trying to predict churn, you do not know how many days remain until cancellation. Including it would make testing performance unrealistic.

### Answer 4

Evaluation should focus on ranking quality among the top 200 predicted customers, such as precision in the top 200 or lift compared with choosing 200 customers at random. Overall accuracy may be less useful because the team cannot act on every customer.

### Answer 5

Webinar attendees may already be more engaged, better onboarded, or more motivated than non-attendees. Their higher renewal rate may reflect pre-existing engagement rather than the causal effect of webinars. A randomized invitation or controlled experiment would provide stronger evidence.

## Common Mistakes

The first mistake is treating the dataset as the problem. Data is only useful in relation to a question and decision. Without framing, analysis becomes a tour of charts with no clear consequence.

The second mistake is ignoring measurement definitions. If "active user" or "revenue" is ambiguous, different people can reach different conclusions from the same data. Define important terms before calculating.

The third mistake is confusing correlation with causation. Patterns can guide hypotheses and predictions, but causal claims require stronger evidence.

The fourth mistake is evaluating models with the wrong metric. Accuracy can be useless when the positive class is rare or when the business only acts on the highest-ranked cases.

The fifth mistake is allowing data leakage. Always check whether each feature would be available at the moment of prediction.

The sixth mistake is communicating only the result and hiding uncertainty. Decision makers need limitations, assumptions, and next steps, not just a polished number.


## Experimental Thinking Without Intimidation

When stakeholders want to know whether a change *caused* an outcome, experiments are the gold standard. A randomized controlled test assigns people to variants without letting preference bias the groups. The control group shows what would have happened otherwise. The treatment group shows the effect of the intervention.

Not every question allows a perfect experiment. Sometimes you use quasi-experiments, difference-in-differences, matching, or careful observational study designs. Beginners should not pretend these methods are trivial, but they should recognize when a dashboard correlation is being oversold as causation. Intellectual honesty is a data science skill.

Before any causal claim, ask: What else changed at the same time? Who self-selected into the behavior? What would falsify this story? Those questions prevent expensive mistakes.

## Feature Thinking and Representation

A feature is a measurable input used by a model. Feature quality often matters more than algorithm fashion. Representing “customer tenure” as days since first purchase may help. Representing city as a raw string may explode into too many categories. Binning, aggregations, and missing-value indicators are design choices with consequences.

Leakage returns here. A feature that secretly encodes the label will dazzle in offline tests and fail in production. Always ask when the feature becomes known relative to the prediction moment. Draw the timeline until it feels boring. Boredom here is safety.

## Class Imbalance and Decision Thresholds

Many important outcomes are rare: fraud, churn this week, critical equipment failure. A model that always predicts “no” can look accurate while being useless. Choose metrics that match the action. Precision and recall, lift at k, expected value, and cost-sensitive thresholds often beat raw accuracy.

Threshold choice is a business decision. A hospital triage model may tolerate more false positives to avoid false negatives. A marketing email model may do the opposite to avoid annoying customers. Data scientists should surface the tradeoff, not hide it inside a default cutoff.

## Reproducibility and Analysis Hygiene

Save the query that produced the dataset. Record the date range. Version the code. Fix random seeds when needed for debugging. Separate exploratory notebooks from production pipelines. Document assumptions in the same place as results. Future you will not remember why a filter excluded weekend orders unless you write it down.

Reproducibility is ethical as well as technical. If a decision affects people, others should be able to audit how the number was produced.

## Dashboard Discipline

Dashboards can illuminate or mislead. Define each metric in writing. Show denominators. Annotate major launches and outages. Avoid chart junk. Provide filters that match how decisions are made. A dashboard without an owner becomes a museum of neglected numbers.

When presenting, lead with the decision and the recommended action, then supporting evidence, then limitations. Do not force executives to excavate meaning from twenty undifferentiated plots.

## Worked Mini-Case: Waitlist Conversion

A course platform asks, “Why did waitlist conversion drop?”

First principles sequence:

1. Confirm the drop is real and not a tracking break.
2. Segment by course, device, country, and traffic source.
3. Check whether the waitlist offer, price, or email timing changed.
4. Inspect form errors and page performance.
5. Compare cohorts before claiming a seasonal story.
6. Propose one or two interventions with a measurement plan.

This is data science even before a predictive model appears. Diagnosis, measurement integrity, and decision support are core craft.

## Bias, Fairness, and Stakeholder Harm

Models can amplify historical inequities. Even without malicious intent, proxy variables can encode sensitive attributes. Before deploying scoring systems that affect opportunities, ask who could be harmed by errors, whether error rates differ across groups, and what human review exists. Fairness is not solved by a single metric, but ignoring it is not neutrality.

## Practice Portfolio Ideas

- Reframe five vague stakeholder requests into decision-centered questions.
- Audit a public dataset’s missingness and measurement quirks.
- Build a simple baseline model and beat it only with honest features.
- Write a one-page decision memo with limitations section mandatory.
- Design an A/B test plan including primary metric and guardrail metrics.

These projects demonstrate thinking quality, which is what first principles are for.


## Sampling Frames and Coverage Error

A sample can be large and still biased if the sampling frame misses important people. Online surveys miss people without internet access. App analytics miss customers who buy offline. Support tickets over-represent frustrated users. Ask who cannot appear in the data. Coverage error silently distorts conclusions.

## Label Quality and Human Judgment

Supervised learning depends on labels. If reviewers disagree on what “urgent ticket” means, the model learns noise. Create labeling guides. Measure inter-rater agreement. Spot-check difficult cases. Bad labels waste model sophistication.

## Baseline Models Are Humble Heroes

Always compare against a simple baseline: overall mean, last week’s value, majority class, or a single strong heuristic. If a complex model cannot beat a baseline in a decision-relevant metric, complexity is not earning its keep. Baselines also catch leakage because leaked models look miraculously good against weak baselines and still deserve suspicion.

## Communication Templates

Use this outline for decision memos:

1. Decision needed by date
2. Recommendation
3. Evidence summary
4. Uncertainty and limitations
5. Alternatives considered
6. Proposed next measurement

This structure respects busy stakeholders and keeps analysis honest.

## Deep Dive: Units, Grain, and Joins
Every analysis has a grain: what one row means. Joining tables at mismatched grain creates duplicated revenue or vanished users. Before joining, state the grain of each table and the intended output grain. Aggregate to a common key carefully. Many famous dashboard bugs are grain bugs wearing SQL costumes.

## Deep Dive: Missing Data Mechanisms
Missingness can be random or systematic. Patients who miss appointments may differ from those who attend. Customers who hide income fields may differ from those who disclose. Blindly dropping missing rows can bias results. Sometimes “missing” is itself a useful feature. Sometimes multiple imputation or domain-specific defaults are required. At minimum, quantify and report missingness.

## Deep Dive: Time Series Caution
Time introduces autocorrelation, seasonality, and drift. Training on random shuffles of time-ordered data leaks the future. Use temporal validation. Be careful with trailing windows and with features computed using the full period. Plot residuals over time. A beautiful average error can hide a model that stopped working last month.

## Deep Dive: Segmentation Before Modeling
Often the right first model is a segmentation table, not a neural network. Split customers by lifecycle stage, product line, or acquisition channel. Heterogeneous groups can cancel each other’s patterns. Segmented baselines frequently outperform a single global model that pretends everyone is alike.

## Deep Dive: Decision Curves and Value
Translate predictions into expected value when possible. If contacting a customer costs $5 and saves $40 with probability p when successful, thresholds can be chosen with economics rather than arbitrary accuracy targets. Not every domain has clean utilities, but attempting the translation clarifies debates.

## Deep Dive: Documentation as a Product
Data dictionaries, metric definitions, and model cards are products for humans. They reduce repeated arguments and onboarding time. Write them in plain language. Include owners and last-reviewed dates. Stale documentation is a hazard; schedule reviews like you schedule deploys.

## Deep Dive: Stakeholder Interviewing
Ask what decision will change, what happens if we are wrong, what constraints exist, and what success looked like historically. Listen for political constraints as well as technical ones. Sometimes the request for a model is really a request for permission to change a process. Clarify the real job.

## Deep Dive: Common Fallacies
Simpson’s paradox, survivorship bias, overfitting to anecdotes, p-hacking, and cherry-picked date ranges all appear in business meetings. Your role includes gentle myth-busting with better charts and clearer definitions. Curiosity plus backbone beats cynical dismissal.

## Portfolio Narrative
Publish a short case study: question, data caveats, method, result, limitation, decision. Hiring managers and collaborators trust people who can show thinking under uncertainty. First principles are visible in how you write caveats.

## Closing Practice Set
Take a public dataset and write a one-page data quality report. Redefine a messy metric until two teammates compute the same number independently. Build a baseline and a simple model with temporal validation. Present results as a decision memo. Repeat with a new domain to generalize the skill.

## Deep Dive: Units, Grain, and Joins
Every analysis has a grain: what one row means. Joining tables at mismatched grain creates duplicated revenue or vanished users. Before joining, state the grain of each table and the intended output grain. Aggregate to a common key carefully. Many famous dashboard bugs are grain bugs wearing SQL costumes.

## Deep Dive: Missing Data Mechanisms
Missingness can be random or systematic. Patients who miss appointments may differ from those who attend. Customers who hide income fields may differ from those who disclose. Blindly dropping missing rows can bias results. Sometimes “missing” is itself a useful feature. Sometimes multiple imputation or domain-specific defaults are required. At minimum, quantify and report missingness.

## Deep Dive: Time Series Caution
Time introduces autocorrelation, seasonality, and drift. Training on random shuffles of time-ordered data leaks the future. Use temporal validation. Be careful with trailing windows and with features computed using the full period. Plot residuals over time. A beautiful average error can hide a model that stopped working last month.

## Deep Dive: Segmentation Before Modeling
Often the right first model is a segmentation table, not a neural network. Split customers by lifecycle stage, product line, or acquisition channel. Heterogeneous groups can cancel each other’s patterns. Segmented baselines frequently outperform a single global model that pretends everyone is alike.

## Deep Dive: Decision Curves and Value
Translate predictions into expected value when possible. If contacting a customer costs $5 and saves $40 with probability p when successful, thresholds can be chosen with economics rather than arbitrary accuracy targets. Not every domain has clean utilities, but attempting the translation clarifies debates.

## Deep Dive: Documentation as a Product
Data dictionaries, metric definitions, and model cards are products for humans. They reduce repeated arguments and onboarding time. Write them in plain language. Include owners and last-reviewed dates. Stale documentation is a hazard; schedule reviews like you schedule deploys.

## Deep Dive: Stakeholder Interviewing
Ask what decision will change, what happens if we are wrong, what constraints exist, and what success looked like historically. Listen for political constraints as well as technical ones. Sometimes the request for a model is really a request for permission to change a process. Clarify the real job.

## Deep Dive: Common Fallacies
Simpson’s paradox, survivorship bias, overfitting to anecdotes, p-hacking, and cherry-picked date ranges all appear in business meetings. Your role includes gentle myth-busting with better charts and clearer definitions. Curiosity plus backbone beats cynical dismissal.

## Portfolio Narrative
Publish a short case study: question, data caveats, method, result, limitation, decision. Hiring managers and collaborators trust people who can show thinking under uncertainty. First principles are visible in how you write caveats.

## Closing Practice Set
Take a public dataset and write a one-page data quality report. Redefine a messy metric until two teammates compute the same number independently. Build a baseline and a simple model with temporal validation. Present results as a decision memo. Repeat with a new domain to generalize the skill.

## Deep Dive: Units, Grain, and Joins
Every analysis has a grain: what one row means. Joining tables at mismatched grain creates duplicated revenue or vanished users. Before joining, state the grain of each table and the intended output grain. Aggregate to a common key carefully. Many famous dashboard bugs are grain bugs wearing SQL costumes.

## Deep Dive: Missing Data Mechanisms
Missingness can be random or systematic. Patients who miss appointments may differ from those who attend. Customers who hide income fields may differ from those who disclose. Blindly dropping missing rows can bias results. Sometimes “missing” is itself a useful feature. Sometimes multiple imputation or domain-specific defaults are required. At minimum, quantify and report missingness.

## Deep Dive: Time Series Caution
Time introduces autocorrelation, seasonality, and drift. Training on random shuffles of time-ordered data leaks the future. Use temporal validation. Be careful with trailing windows and with features computed using the full period. Plot residuals over time. A beautiful average error can hide a model that stopped working last month.

## Deep Dive: Segmentation Before Modeling
Often the right first model is a segmentation table, not a neural network. Split customers by lifecycle stage, product line, or acquisition channel. Heterogeneous groups can cancel each other’s patterns. Segmented baselines frequently outperform a single global model that pretends everyone is alike.

## Deep Dive: Decision Curves and Value
Translate predictions into expected value when possible. If contacting a customer costs $5 and saves $40 with probability p when successful, thresholds can be chosen with economics rather than arbitrary accuracy targets. Not every domain has clean utilities, but attempting the translation clarifies debates.

## Deep Dive: Documentation as a Product
Data dictionaries, metric definitions, and model cards are products for humans. They reduce repeated arguments and onboarding time. Write them in plain language. Include owners and last-reviewed dates. Stale documentation is a hazard; schedule reviews like you schedule deploys.

## Deep Dive: Stakeholder Interviewing
Ask what decision will change, what happens if we are wrong, what constraints exist, and what success looked like historically. Listen for political constraints as well as technical ones. Sometimes the request for a model is really a request for permission to change a process. Clarify the real job.

## Deep Dive: Common Fallacies
Simpson’s paradox, survivorship bias, overfitting to anecdotes, p-hacking, and cherry-picked date ranges all appear in business meetings. Your role includes gentle myth-busting with better charts and clearer definitions. Curiosity plus backbone beats cynical dismissal.

## Summary

Data science from first principles begins with clear thinking. Start with the decision, define the unit of analysis, understand how reality became data, explore quality and distributions, distinguish association from causation, account for uncertainty, and evaluate models according to the action they support.

Algorithms are important, but they are not magic. A simple model built on a well-framed question, clean measurement, correct timing, and honest evaluation is more valuable than a sophisticated model aimed at the wrong target. The best beginner habit is to keep asking: What decision will this inform, what data would be available at that moment, and how will we know whether the result helped?

<!-- quiz:data-final -->
