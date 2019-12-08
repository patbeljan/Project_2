import sqlalchemy
import pandas as pd
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

def databaser(engine, file1, file2):
    depression_df = pd.read_csv(file1)
    alcohol_df = pd.read_csv(file2)

    mini_dep_df = depression_df[['STATE NAME', 'Yes%']]
    mini_dep_df.rename(columns = {"Yes%": "Dep_Yes%"}, inplace = True)

    alcohol_df = alcohol_df.merge(mini_dep_df, left_on = 'STATE NAME', right_on = 'STATE NAME', how = 'inner')

    depression_df.to_sql(con=engine, index=False, name= 'depression', if_exists='replace')
    alcohol_df.to_sql(con=engine, index=False, name= 'alcohol', if_exists='replace')
    
    return None

