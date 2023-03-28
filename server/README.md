# API

## Server Issues & Fixes

### MongoDB Connection Issues

Error:

```bash
Initial Distribution API Database connection error occured - MongooseServerSelectionError: connect ECONNREFUSED ::1:27017
```

Fix: <https://www.mongodb.com/community/forums/t/mongoserverselectionerror-connect-econnrefused-27017/156754/>

Replace MongoDB connection url from

```typescript
await mongoose.connect('mongodb://localhost:27017/post_db', ...
```

to

```typescript
await mongoose.connect('mongodb://127.0.0.1/post_db', ...
```
