"""message

Revision ID: 81cfb87f70bd
Revises: 11503b5f56e4
Create Date: 2024-10-03 01:11:49.919897

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '81cfb87f70bd'
down_revision = '11503b5f56e4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.alter_column('ingredients',
               existing_type=sa.TEXT(),
               type_=sa.JSON(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.alter_column('ingredients',
               existing_type=sa.JSON(),
               type_=sa.TEXT(),
               existing_nullable=True)

    # ### end Alembic commands ###
