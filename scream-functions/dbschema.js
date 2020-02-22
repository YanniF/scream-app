let db = {
	users: [
		{
			userId: '98A3FkkFDE99mAjfns82qQkkfd83',
			email: 'test@test.com',
			handle: 'user',
			createdAt: '2020-02-21T19:48:23.324Z',
			imageUrl: 'img/dmslakmdo04.png',
			bio: 'Hi, I am a Quantum Life Coaching',
			website: 'http://www.firebase.com',
			location: 'Lisbon - Portugal',
		},
	],
	screams: [
		{
			userHandle: 'user',
			body: 'content',
			createdAt: '2020-02-20T16:38:50.943Z',
			likeCount: 2,
			commentCount: 3,
		},
	],
	comments: [
		{
			userHandle: 'user',
			screamId: '66G3FrtgFDE0SmAj3ns82qPkifm57',
			body: 'Hahahahahahaha',
			createdAt: '2020-02-22T13:54:44.462Z',
		},
	],
	notifications: [
		{
			recipient: 'user',
			sender: 'john',
			read: 'true | false',
			screamId: '66G3FrtgFDE0SmAj3ns82qPkifm57',
			type: 'like | comment',
			createdAt: '2020-02-23T13:54:44.462Z',
		},
	],
};

const userDetails = {
	// Redux data
	credentials: {
		userId: 'jln3nDSn8N09h27sdH8A',
		email: 'test@test.com',
		handle: 'test',
		createdAt: '2020-02-22T13:11:56.367Z',
		imageUrl: 'img/d3dda2mslakm3do04.png',
		bio: 'Hi! Hey! Hello!',
		website: 'http://yannifraga.com',
		location: 'London, UK',
	},
	likes: [
		{
			userHandle: 'user',
			screamId: '9oelWCWOpRfzhaooEL5CATs2',
		},
		{
			userHandle: 'user',
			screamId: 'yKoWpS4UInZnG7yl6PlQ6Hts1',
		},
	],
};
