-- 创建扩展
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";
CREATE EXTENSION IF NOT EXISTS "unaccent";

-- 创建数据库用户和权限（如果需要）
-- GRANT ALL PRIVILEGES ON DATABASE tms_nlops_demo TO postgres;