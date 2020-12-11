const data = [{
  id: 1, post_text: 'Hi', posted_at_time: '2020-12-09T14:43:34.945Z', users_id: 2,
}, {
  id: 2, post_text: 'Bye', posted_at_time: '2020-12-09T14:43:34.945Z', users_id: 3,
}, {
  id: 3, post_text: 'Ya Welcome :)', posted_at_time: '2020-12-09T14:50:28.768Z', users_id: 6,
}, {
  id: 13, post_text: 'مرحبا بكم في فيسبوك ^_^', posted_at_time: '2020-12-09T14:51:37.610Z', users_id: 6,
}, {
  id: 14, post_text: 'وأخييييييرااااا خلصناااا', posted_at_time: '2020-12-09T14:52:36.291Z', users_id: 1,
}, {
  id: 15, post_text: 'احلا ويك والله :) ..\nواحلا منتور الاء سعد الدين :) :) ', posted_at_time: '2020-12-09T14:54:01.482Z', users_id: 8,
}, {
  id: 16, post_text: 'لقد هرمنا من أجل هذه اللحظة >_<', posted_at_time: '2020-12-09T14:54:18.282Z', users_id: 6,
}, {
  id: 17, post_text: 'يلااا بااااااي من هووووووووون', posted_at_time: '2020-12-09T14:54:50.468Z', users_id: 6,
}, {
  id: 18, post_text: 'اللايك مش شغال يا الاء ...\nهي لايك كبيرة هون :)', posted_at_time: '2020-12-09T14:55:49.864Z', users_id: 8,
}, {
  id: 19, post_text: 'هـــــــــــــــــــــــــــــــــــــــــــــــــــــــاي يولاد \n', posted_at_time: '2020-12-09T14:56:29.913Z', users_id: 9,
}, {
  id: 20, post_text: '_-_ تقعدوش تغطوا على الطوش اللي علي بده يعرفها ', posted_at_time: '2020-12-09T14:57:50.017Z', users_id: 10,
}, {
  id: 21, post_text: 'روق ي حسن ', posted_at_time: '2020-12-09T14:59:39.147Z', users_id: 9,
}, {
  id: 22, post_text: 'اببال', posted_at_time: '2020-12-09T15:42:20.745Z', users_id: 11,
}, {
  id: 23, post_text: 'كيف الفرح يا خميس :) ..\n', posted_at_time: '2020-12-09T15:50:59.132Z', users_id: 8,
}, {
  id: 24, post_text: 'الفيسبوك تبعنا قلب لدردشة ههههههههههه', posted_at_time: '2020-12-09T18:23:50.188Z', users_id: 6,
}, {
  id: 36, post_text: 'يسعد مساؤكم ي جماعة مقدما .. ويسعد مساك يا علي خصوصا .. تسحيجة من الفيسبوك تبعنا ههههه\n\n', posted_at_time: '2020-12-10T09:45:45.260Z', users_id: 6,
}, {
  id: 43, post_text: 'هلا بالخميس :) ', posted_at_time: '2020-12-10T10:15:20.327Z', users_id: 1,
}, {
  id: 44, post_text: 'أشعر بالفخر :) مع آلاء سحلوب وحسن النجار و 2 آخرين ^_^', posted_at_time: '2020-12-10T10:15:46.652Z', users_id: 6,
}, {
  id: 46, post_text: 'خف علينا :)', posted_at_time: '2020-12-10T10:18:26.137Z', users_id: 13,
}, {
  id: 47, post_text: 'Hello ', posted_at_time: '2020-12-10T16:21:51.665Z', users_id: 14,
}];

data.forEach(({ post_text, posted_at_time, users_id }) => console.log(`INSERT INTO posts(post_text,posted_at_time,users_id) values ('${post_text}','${posted_at_time}',${users_id});`));
