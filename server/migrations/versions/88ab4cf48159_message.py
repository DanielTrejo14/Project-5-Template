"""message

Revision ID: 88ab4cf48159
Revises: d11c6ab30c7b
Create Date: 2024-10-02 23:46:07.879703

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '88ab4cf48159'
down_revision = 'd11c6ab30c7b'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.alter_column('categories',
               existing_type=sa.VARCHAR(),
               type_=sa.Text(),
               existing_nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('recipe', schema=None) as batch_op:
        batch_op.alter_column('categories',
               existing_type=sa.Text(),
               type_=sa.VARCHAR(),
               existing_nullable=True)

    # ### end Alembic commands ###
